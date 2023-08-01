/*Steps which i followed:

1) First created tokens from the given function 
2) Then created one syntax tree(parse tree) for given tokens.
3) Then optimized the above step to generate optimized parse tree.
4) Finally generated one assembly code instructions which can be given as an input in the simulate() function for proper testing.


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/


function ThreePassCompiler () {
    this.args = [];
    this.tokens = [];
};

ThreePassCompiler.prototype.compile = function (program) {
  return this.thirdPass(this.secondPass(this.firstPass(program)));
};

ThreePassCompiler.prototype.firstPass = function (program) {
  this.generateTokens(program);
  this.argumentLists();
  return this.expression();  
};


ThreePassCompiler.prototype.secondPass = function (ast) {
  return this.parseTokens( ast )
};


ThreePassCompiler.prototype.thirdPass = function (ast) {
  return this.assemblyProgram( ast );
};


ThreePassCompiler.prototype.generateTokens = function (program) {
  var regex = /\s*([-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+)\s*/g;
  this.tokens = program.replace(regex, ":$1").substring(1).split(':').map( function (token) {
    return isNaN(token) ? token : token|0;
  });
};

ThreePassCompiler.prototype.argumentLists = function() {
    this.tokens.shift();
    var arg = this.tokens.shift();
   
    while( this.tokens.length > 0 && arg != ']' ) {
        this.args.push( arg );
        arg = this.tokens.shift();
    }
};


ThreePassCompiler.prototype.expression = function() {
    var apart = this.term(),
        t0    = this.tokens[0],
        now   = null;
   
    if( t0 == undefined || (t0 != '+' && t0 != '-') )
        return apart;
       
    while( t0 != undefined && (t0 == '+' || t0 == '-') ) {
      var curop = this.tokens.shift(),
          bpart = this.term();
     
      if( now != null )
        now = { op: curop, a: now, b: bpart }
      else
        now = { op: curop, a: apart, b: bpart }
     
      t0 = this.tokens[0];
    }
   
    return now;
};


ThreePassCompiler.prototype.term = function() {
    var apart = this.factor(),
        t0    = this.tokens[0],
        now   = null;
   
    if( t0 == undefined || (t0 != '*' && t0 != '/') )
        return apart;
       
    while( t0 != undefined && (t0 == '*' || t0 == '/') ) {
      var curop = this.tokens.shift(),
          bpart = this.factor();
         
      if( now != null )
        now = { op: curop, a: now, b: bpart }
      else
        now = { op: curop, a: apart, b: bpart }
     
      t0 = this.tokens[0];
    }
   
    return now;
};


ThreePassCompiler.prototype.factor = function() {
    var tok = this.tokens.shift();

    if( typeof( tok ) == 'number' )
        return { op: 'imm', n: tok };
       
    if( tok.match( /^\w/ ) )
        return { op: 'arg', n: this.args.indexOf( tok ) };
   
    var ret = this.expression();
   
    this.tokens.shift();
   
    return ret;
};


ThreePassCompiler.prototype.parseTokens = function( expr ) {
    var this_op = expr.op;
   
    if( this_op == 'imm' || this_op == 'arg' )
        return expr;
       
    var left  = this.parseTokens( expr.a ),
        right = this.parseTokens( expr.b );
   
    if( left.op == 'imm' && right.op == 'imm' ) {
      var lval = left.n, rval = right.n;
     
      var value;
     
      switch( this_op ) {
        case '+':   value = lval + rval; break;
        case '-':   value = lval - rval; break;
        case '*':   value = lval * rval; break;
        case '/':   value = lval / rval; break;
      }
     
      return { op: 'imm', n: value };
    }
   
    return { op: this_op, a: left, b: right };
};


ThreePassCompiler.prototype.assemblyProgram = function( node ) {
    var mc_ins = []
   
    if( node.op == 'imm' || node.op == 'arg' ) {
        if( node.op == 'imm' )
            mc_ins.push( 'IM ' + node.n );
        else
            mc_ins.push( 'AR ' + node.n );
    }
    else {
      mc_ins = this.assemblyProgram( node.a );
      mc_ins = mc_ins.concat( this.assemblyProgram( node.b ) );
      mc_ins = mc_ins.concat( ['PO', 'SW', 'PO'] );
      switch( node.op ) {
        case '+':   mc_ins.push( 'AD' ); break;
        case '-':   mc_ins.push( 'SU' ); break;
        case '*':   mc_ins.push( 'MU' ); break;
        case '/':   mc_ins.push( 'DI' ); break;
      }
    }
     
    return mc_ins.concat( ['PU'] );
};

function simulate(asm, args) {
      var r0 = undefined;
      var r1 = undefined;
      var stack = [];
      asm.forEach(function (instruct) {
        var match = instruct.match(/(IM|AR)\s+(\d+)/) || [ 0, instruct, 0 ];
        var ins = match[1];
        var n = match[2] | 0;
   
        if (ins == 'IM')   { r0 = n; }
        else if (ins == 'AR') { r0 = args[n]; }
        else if (ins == 'SW') { var tmp = r0; r0 = r1; r1 = tmp; }
        else if (ins == 'PU') { stack.push(r0); }
        else if (ins == 'PO') { r0 = stack.pop(); }
        else if (ins == 'AD') { r0 += r1; }
        else if (ins == 'SU') { r0 -= r1; }
        else if (ins == 'MU') { r0 *= r1; }
        else if (ins == 'DI') { r0 /= r1; }
      });
      return r0;
    }

var prog = '[ x y z ] ( 2*3*x + 5*y - 3*z ) / (1 + 3 + 2*2)';

var c = new ThreePassCompiler();
var p1 = c.firstPass(prog);
console.log("Pass1===>",p1)
var p2 = c.secondPass(p1);
console.log("Pass2===>",p2)
var p3 = c.thirdPass(p2);
console.log("Pass3===>",p3)

console.log(simulate(p3,[4,0,0]))

console.log(simulate(p3,[4,8,0]))

console.log(simulate(p3,[4,8,16]))

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
