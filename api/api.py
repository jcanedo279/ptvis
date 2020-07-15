from flask import Flask
from flask import request

app = Flask(__name__)

TILE_SIZE = 15

@app.route('/api/getV',  methods = ['GET', 'POST'])
def getV():
    if request.method == 'GET':
        dim = int(request.args.get('dim'))
        size = int(request.args.get('size'))
        sV = list(request.args.get('sV'))
        
        ## Clean up invalid shift vector inputs
        ## convert from list to string
        if type(sV[0]) in {str}:
            sV = sVStrToList(sV)
        ## If too long remove until right length, if too short remove until right length
        while len(sV) > dim:
            sV.pop()
        while len(sV) < dim:
            sV.append(0)
    
        vertices = []
        for r in range(dim):
            for s in range(r+1, dim):
                for a in range(-size, size+1):
                    for b in range(-size, size+1):
                        vertices.append(genVert(dim, sV, r, a, s, b))

        return { 'vertices': vertices }
        
@app.route('/api/example')
def example():
    return { 'example': [0, 1, 2, 3, 4] }

def sVStrToList(sV):
    ## First lets clean up the [] strings around the sV
    if sV[0] == '[':
        sV = sV[1:]
    if sV[-1] == ']':
        sV = sV[:-1]
        
    if type(sV) is list:
        ## We currently have a list so lets join it together into a string and resplit w/ delimeter
        sV = ''.join(sV)
        sV = sV.split(',')
        return [cleanShiftStr(shift) for shift in sV]
        
    
    
def cleanShiftStr(shiftStr):
    while shiftStr[0] == ' ':
        shiftStr = shiftStr[1:]
    while shiftStr[-1] == ' ':
        shiftStr = shiftStr[:-1]
    return float(shiftStr)

def genVert(dim, sV, r, a, s, b):
    nV = [(-1)**((2/dim)*i) for i in range(dim)]
    if nV[s-r].imag == 0:
        kp = 1j*(nV[r]*(b-sV[s]) - nV[s]*(a-sV[r])) / 0.00001
    else:
        kp = 1j*(nV[r]*(b-sV[s]) - nV[s]*(a-sV[r])) / nV[s-r].imag
        
    k = [1+((kp/i).real+t)//1 for i, t in zip(nV, sV)]
    
    vertices = []
    for k[r], k[s] in [(a, b), (a+1, b), (a+1, b+1), (a, b+1)]:
        vSum = sum(x*t for t, x in zip(nV, k))
        vertices.append(vSum)
    return imagToReal(vertices)

def imagToReal(vertices):
    newVertices = []
    for vertex in vertices:
        scaledVert = TILE_SIZE*vertex
        newVertices.append((scaledVert.real, scaledVert.imag))
    return newVertices


if __name__ == '__main__':
    app.run()