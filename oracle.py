import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def cups(g, c, p):
    t = g*c; k = -(-t//p)
    return f"The {pl(g,' guest',' guests')} at {pl(c,' cup',' cups')} each need {pl(t,' cup',' cups')}, in packs of {p} that is {pl(k,' pack',' packs')}, leaving {pl(k*p-t,' cup',' cups')}."
def tables(g, s):
    k = -(-g//s)
    return f"The {pl(g,' guest',' guests')} at {s} a table take {pl(k,' table',' tables')}, leaving {pl(k*s-g,' empty seat',' empty seats')}."
def trays(g, v, r):
    t = g*v; k = -(-t//r)
    return f"The {pl(g,' guest',' guests')} at {pl(v,' serving',' servings')} each need {pl(t,' serving',' servings')}, in trays of {r} that is {pl(k,' tray',' trays')}, leaving {pl(k*r-t,' serving',' servings')}."
def cost(k, p, n, q):
    return f"The {pl(k,' pack',' packs')} at ${dec(p)} and {pl(n,' tray',' trays')} at ${dec(q)} cost ${money(k*p+n*q)}, packs ${money(k*p)} and trays ${money(n*q)}."
random.seed(766)
R=random.randint
cases = [
 dict(fn="cups", args=["46","3","50"], expect=cups(46,3,50)),
 dict(fn="tables", args=["46","8"], expect=tables(46,8)),
 dict(fn="trays", args=["46","4","24"], expect=trays(46,4,24)),
 dict(fn="cost", args=["3","6.25","8","14.00"], expect=cost(3,625,8,1400)),
 dict(fn="tables", args=["1","1"], expect=tables(1,1)),
 dict(fn="cups", args=["1","1","1"], expect=cups(1,1,1)),
]
for _ in range(25):
    g,c,p=R(1,100000),R(1,100),R(1,10000); cases.append(dict(fn="cups", args=[str(g),str(c),str(p)], expect=cups(g,c,p)))
for _ in range(20):
    g,s=R(1,100000),R(1,100); cases.append(dict(fn="tables", args=[str(g),str(s)], expect=tables(g,s)))
for _ in range(25):
    g,v,r=R(1,100000),R(1,100),R(1,1000); cases.append(dict(fn="trays", args=[str(g),str(v),str(r)], expect=trays(g,v,r)))
for _ in range(20):
    k,p,n,q=R(1,100000),R(1,1000000),R(1,100000),R(1,1000000); cases.append(dict(fn="cost", args=[str(k),dec(p),str(n),dec(q)], expect=cost(k,p,n,q)))
errs=[["cups",["0","3","50"]],["cups",["100001","3","50"]],["cups",["46","0","50"]],["cups",["46","101","50"]],["cups",["46","3","0"]],["cups",["46","3","10001"]],
 ["tables",["0","8"]],["tables",["46","0"]],["tables",["46","101"]],
 ["trays",["0","4","24"]],["trays",["46","0","24"]],["trays",["46","101","24"]],["trays",["46","4","0"]],["trays",["46","4","1001"]],
 ["cost",["0","6.25","8","14"]],["cost",["3","0","8","14"]],["cost",["3","6.25","0","14"]],["cost",["3","6.25","8","0"]],["cost",["3","6.25","8","10000.01"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
