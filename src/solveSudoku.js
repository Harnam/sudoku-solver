export default function solveSudoku (question) {

    function checkValidity(vals, pos, val) {
        for(let i = 0; i < 3; i++) {
          for(let j = 0; j < 3; j++) {
            for(let k = 0; k < 3; k++) {
              for(let l = 0; l < 3; l++) {
                const isInsideBigSquare = (pos.bigRow === i) && (pos.bigSquare === j);
                const isInsideHorizontalLine = (pos.bigRow === i) && (pos.row === k);
                const isInsideVerticalLine = (pos.bigSquare === j) && (pos.square === l);
                const isNotItself = !((pos.bigRow === i) && (pos.bigSquare === j) && (pos.row === k) && (pos.square === l));
                if ((isInsideBigSquare || isInsideHorizontalLine || isInsideVerticalLine) && isNotItself)
                    if(vals[i][j][k][l] !== null && vals[i][j][k][l] === val)
                        return false;
              }
            }
          }
        }
        return true;
    }

    function convertToPossibles(vals) {
        // console.log("convertToPossibles called", vals);
        let possibles = JSON.parse(JSON.stringify(vals));
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (vals[i][j][k][l] === null) {
                            possibles[i][j][k][l] = new Set();
                            for(let m = 1; m < 10; m++){
                                if (checkValidity(vals, { bigRow: i, bigSquare: j, row: k, square: l }, m)) {
                                    possibles[i][j][k][l].add(m);
                                }
                            }
                            if (possibles[i][j][k][l].size === 0)
                                return null;
                            // console.log("adding possibles",possibles[i][j][k][l])
                        } else 
                            possibles[i][j][k][l] = new Set([vals[i][j][k][l]]);
                    }
                }
            }
        }
        // console.log("possibles",possibles[0][0][0][0]);
        return possibles;
    }

    // console.log("solveSudoku is called");
    let possibles = convertToPossibles(question);
    if(possibles === null) return null;
    // console.log("possibles generated", possibles[0][0]);


    // console.log(possibles);
    // console.log(possibles[0]);
    // // console.log(possibles[0][0]);
    // console.log(possibles[0][0][0]);
    // console.log(possibles[0][0][0][0]);
    // for(let i = 0; i < 3; i++)
    //     for (let j = 0; j < 3; j++)
    //         for (let k = 0; k < 3; k++)
    //             for (let l = 0; l < 3; l++)
    //                 console.log(possibles[i][j][k][l]);

    return findSolution(possibles, 1);

}

function findSolution(possibles, level) {
    console.log(JSON.stringify(possibles))
    console.log("starting at level ", level);
    // for(let i = 0; i < 3; i++)
    //     for (let j = 0; j < 3; j++)
    //         for (let k = 0; k < 3; k++)
    //             for (let l = 0; l < 3; l++)
    //                 console.log(possibles[i][j][k][l]);
    // console.log("find solutions called");
    let solutions = new Set();
    let solvable = true;

    function updatePossibles(possibles, pos, val) {
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        const isInsideBigSquare = (pos.bigRow === i) && (pos.bigSquare === j);
                        const isInsideHorizontalLine = (pos.bigRow === i) && (pos.row === k);
                        const isInsideVerticalLine = (pos.bigSquare === j) && (pos.square === l);
                        const isNotItself = !((pos.bigRow === i) && (pos.bigSquare === j) && (pos.row === k) && (pos.square === l));
                        if ((isInsideBigSquare || isInsideHorizontalLine || isInsideVerticalLine) && isNotItself) {
                            possibles[i][j][k][l].delete(val);
                            if(possibles[i][j][k][l].size === 0)
                                return null;
                        }
                        if (!isNotItself)
                            possibles[i][j][k][l] = new Set([val]);
                    }
                }
            }
        }
        return possibles;
    }

    function convertToSolution(possibles) {
        let sol = JSON.parse(JSON.stringify(possibles));
        for(let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    for (let l = 0; l < 3; l++)
                        sol[i][j][k][l] = possibles[i][j][k][l].values().next().value;
        return sol;
    }

    function isSolved(possibles) {
        for(let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    for (let l = 0; l < 3; l++)
                        if (possibles[i][j][k][l].size !== 1)
                            return false;
        return true;
    }

    function findUniqueInBigSquares(possibles) {
        // console.log("findUniqueInBigSquares called")
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (possibles[i][j][k][l].size !== 1) {
                            let iterator = possibles[i][j][k][l].values();
                            for(let m = 0; m < possibles[i][j][k][l].size; m++) {
                                let val = iterator.next().value;
                                let isUnique = true;
                                for (let n = 0; n < 3; n++) {
                                    for (let o = 0; o < 3; o++) {
                                        // console.log(val, '--->',Array.from(possibles[i][j][n][o]).indexOf(val) > -1, !((n === k) && (o === l)))
                                        if (!((n === k) && (o === l)) && possibles[i][j][n][o].has(val)){
                                            // console.log('mel gaya haha')
                                            isUnique = false;
                                        }
                                    }
                                }
                                if (isUnique) return { pos: { bigRow: i, bigSquare: j, row: k, square: l }, val: val }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    function findUniqueInHorizontals(possibles) {
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (possibles[i][j][k][l].size !== 1) {
                            let iterator = possibles[i][j][k][l].values();
                            for(let m = 0; m < possibles[i][j][k][l].size; m++) {
                                let val = iterator.next().value;
                                let isUnique = true;
                                for (let n = 0; n < 3; n++) {
                                    for (let o = 0; o < 3; o++) {
                                        if (!((n === j) && (o === l)) && possibles[i][n][k][o].has(val))
                                            isUnique = false;
                                    }
                                }
                                if (isUnique) return { pos: { bigRow: i, bigSquare: j, row: k, square: l }, val: val }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    function findUniqueInVerticals(possibles) {
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (possibles[i][j][k][l].size !== 1) {
                            let iterator = possibles[i][j][k][l].values();
                            for(let m = 0; m < possibles[i][j][k][l].size; m++) {
                                let val = iterator.next().value;
                                let isUnique = true;
                                for (let n = 0; n < 3; n++) {
                                    for (let o = 0; o < 3; o++) {
                                        if (!((n === i) && (o === k)) && possibles[n][j][o][l].has(val))
                                            isUnique = false;
                                    }
                                }
                                if (isUnique) return { pos: { bigRow: i, bigSquare: j, row: k, square: l }, val: val }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    while (solvable) {
        let unique = findUniqueInBigSquares(possibles) || findUniqueInHorizontals(possibles) || findUniqueInVerticals(possibles);
        // console.log("isunique", unique)
        if (unique !== null) {
            // console.log("unique found", unique)
            possibles = updatePossibles(possibles, unique.pos, unique.val);
            if(possibles === null){
                solvable = false;
                console.log("returning null at level", level)
                break;
            } 
            // console.log("possibles updated")
            if(isSolved(possibles)) {
                solvable = false;
                solutions.add(convertToSolution(possibles));
                break;
            }
            continue;
        } else
            break;

    }

    if(possibles !== null) {
        let count = 0;
        for(let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    for (let l = 0; l < 3; l++){
                        count = count + possibles[i][j][k][l].size;
                        // console.log(possibles[i][j][k][l] ,i,j,k,l)
                    }
                    
        console.log("size: ", count);
    }

    console.log("guess now");

    if(solvable){
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        console.log("level", level, "app posiibles", possibles[i][j][k][l]);
                        console.log("possibles size", possibles[i][j][k][l].size)
                        if (possibles[i][j][k][l].size !== 1) {
                            let iterator = possibles[i][j][k][l].values();
                            
                            for(let m = 0; m < possibles[i][j][k][l].size; m++) {
                                // let guessValue = iterator.next().value;
                                let guessValue = Array.from(possibles[i][j][k][l])[m];
                                console.log("current level, ", level , "m value:", m)
                                console.log("guessing possible at ",i,j,k,l,"val: ", guessValue);
                                
                                let guessPossibles = updatePossibles(possibles, { bigRow: i, bigSquare: j, row: k, square: l }, guessValue);
                                if(guessPossibles !== null) {
                                    if(isSolved(guessPossibles)) {
                                        solutions.add(convertToSolution(guessPossibles));
                                        continue;
                                    }
                                    console.log("about to find soliution")
                                    let guessSolutions = findSolution(guessPossibles, level+1);
                                    console.log("guesssolutions", level, guessSolutions,"m val:",m)
                                    if(guessSolutions !== null)
                                        solutions = solutions.union(guessSolutions);
                                    // else continue
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log("solutions",solutions);
    if (solutions.size === 0) {
        console.log("solutions empty so returning null at level",level)
        return null;
    }

    return solutions;

}