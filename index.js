// algoritma
// 3 lu gruplari olustur
// her bir cell icin;
    // possible isimli bir array olusturup keni 3 lusunde, yatayinda ve dikeyinde olmayanlari buraya at.
// allpossibles isimli array olustur ve tüm bos "cell"lerin possible arraylarini buraya at.
// allpossibles arrayinde eleman kalmayana kadar her cell icin;
    // if kendi possible arrayinde olup komsularinin(dikey,yatay,grup) possible arrayinde olmayan eleman varsa;
        // bu numarayi cell icine yerlestir.
        // allpossibles arrayinden bu dolan cell i sil
        // komsularinin allpossibles arrayinin icindeki possibles arraylerinden bu numarayi sil


    // ISLEMLER DOGRU FAKAT UYGULAMA SIRASINDAN KAYNAKLI SACMALAYABILIYOR ZORLARDA


function sudokuSolver(board) {
    let nums = [1,2,3,4,5,6,7,8,9];
    let tripleGroups = []
    let tripleGroup1 = [];
    let tripleGroup2 = [];
    let tripleGroup3 = [];
    let tripleGroup4 = [];
    let tripleGroup5 = [];
    let tripleGroup6 = [];
    let tripleGroup7 = [];
    let tripleGroup8 = [];
    let tripleGroup9 = [];
    let allPossibles = [];


    for (let i = 0; i < board.length; i++){
        // groups
        for (let j = 0; j < board.length; j++){
            if (i < 3 && j < 3) tripleGroup1.push({i,j,val: board[i][j]});
            else if (i < 3 && j < 6) tripleGroup2.push({i,j,val: board[i][j]});
            else if (i < 3 && j < 9) tripleGroup3.push({i,j,val: board[i][j]});

            else if (i < 6 && j < 3) tripleGroup4.push({i,j,val: board[i][j]});
            else if (i < 6 && j < 6) tripleGroup5.push({i,j,val: board[i][j]});
            else if (i < 6 && j < 9) tripleGroup6.push({i,j,val: board[i][j]});

            else if (i < 9 && j < 3) tripleGroup7.push({i,j,val: board[i][j]});
            else if (i < 9 && j < 6) tripleGroup8.push({i,j,val: board[i][j]});
            else if (i < 9 && j < 9) tripleGroup9.push({i,j,val: board[i][j]});
        }    
    }

    tripleGroups.push(tripleGroup1)
    tripleGroups.push(tripleGroup2)
    tripleGroups.push(tripleGroup3)
    tripleGroups.push(tripleGroup4)
    tripleGroups.push(tripleGroup5)
    tripleGroups.push(tripleGroup6)
    tripleGroups.push(tripleGroup7)
    tripleGroups.push(tripleGroup8)
    tripleGroups.push(tripleGroup9)


    // define each cell's neighbors and possible values
    function checkCells(all) {
        for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){
            //
            if (board[i][j] == "-") {
            //
                let horizontalLine = [];
                let verticalLine = [];
                let group = tripleGroups.find(gr => gr.find(a => a.i === i && a.j === j));
                let possibles = [];
                
                // removing the cell's itself from group
                
                group = group.filter(p => p.i !== i || p.j !== j);
                if (all) {
                    group = group.filter(pair => board[pair.i][pair.j] == "-");
                    group = group.map(pair => ({i:pair.i,j:pair.j,val: pair.val,possibles: allPossibles.find(a => a.i == pair.i && a.j == pair.j).possibles}))
                }

                // defining horizantal line                        
                
                for (let h = 0; h < board.length; h++) {
                     if (h !== j) {
                         if (all && board[i][h] == "-") horizontalLine.push({i,j:h,val: board[i][h],possibles: allPossibles.find(a => a.i == i && a.j == h).possibles})
                         else if (!all) horizontalLine.push({val: board[i][h]})
                     } 
                        }

                // defining vertical line       

                for (let h = 0; h < board.length; h++) {
                    if (h !== i) {
                        if(all && board[h][j] == "-") verticalLine.push({i:h,j,val: board[h][j],possibles: allPossibles.find(a => a.i == h && a.j == j).possibles})
                        else if (!all) verticalLine.push({val: board[h][j]});
                    }
                }

                    if (!all) nums.forEach(num => horizontalLine.every(a => a.val != num) && verticalLine.every(a => a.val != num) && group.every(a => a.val != num ) && possibles.push(num));
                    else possibles = allPossibles.find(a => a.i == i && a.j == j).possibles

                    // recognizing which cell is appropriate
                    
                    if (!all) allPossibles.push({possibles,i,j}); 
                    else if (possibles.length == 1 || possibles.find(num => verticalLine.every(a => a.possibles.every(b => b !== num)) || horizontalLine.every(a => a.possibles.every(b => b !== num)) || group.every(a => a.possibles.every(b => b !== num)))) {      
                        let num = possibles.length == 1 ? possibles[0] : possibles.find(num => verticalLine.every(a => a.possibles.every(b => b !== num)) || horizontalLine.every(a => a.possibles.every(b => b !== num)) || group.every(a => a.possibles.every(b => b !== num)));
                        board[i][j] = num.toString();
                        allPossibles = allPossibles.filter(gr => gr.i !== i || gr.j !== j);
                        allPossibles = allPossibles.map(pos => {
                            let found = false;
                            for (let a = 0; a < verticalLine.length; a++) {
                                if (pos.i === verticalLine[a].i && pos.j === j) found = true;
                            }
                            for (let a = 0; a < horizontalLine.length; a++) {
                                if (pos.i === i && pos.j === horizontalLine[a].j) found = true;
                            }
                            for (let a = 0; a < group.length; a++) {
                                if (pos.i === group[a].i && pos.j === group[a].j) found = true;
                            }
                            if (found) return {possibles: pos.possibles.filter(n => n != num), i:pos.i,j:pos.j};
                            else return pos;
                        })
                            
                        // checking process and debugging
                        // console.log(" ")
                        // console.log("----------------")
                        // console.log({i,j,num}, allPossibles)
                        // console.log(" ")
                        // console.log(board[0].join("|"))
                        // console.log(board[1].join("|"))
                        // console.log(board[2].join("|"))
                        // console.log(board[3].join("|"))
                        // console.log(board[4].join("|"))
                        // console.log(board[5].join("|"))
                        // console.log(board[6].join("|"))
                        // console.log(board[7].join("|"))
                        // console.log(board[8].join("|"))
                        // console.log(" ")
                        // console.log("----------------")
                        // console.log(" ")
                    }

                    else  {
                        for (let possibleNum = 0; possibleNum < possibles.length; possibleNum++) {
                            let num = possibles[possibleNum];

                            if (possibles.length == 2) {

                            if (verticalLine.find(v => v.possibles.length == 2 && v.possibles[0] == possibles[0] && v.possibles[1] == possibles[1])) {
                                let same = verticalLine.find(v => v.possibles.length == 2 && v.possibles[0] == possibles[0] && v.possibles[1] == possibles[1])
                                let tempVertical = verticalLine.filter(ver => ver.i !== same.i || ver.j !== same.j);
                                    allPossibles = allPossibles.map(pos => {
                                    let found = false;
                                    for (let a = 0; a < tempVertical.length; a++) {
                                        if (pos.i == tempVertical[a].i && pos.j == j) found = true;
                                    }
                                    if (found) return {possibles: pos.possibles.filter(n => n != possibles[0] && n != possibles[1]), i:pos.i,j:pos.j};
                                    else return pos;
                            })
                            }

                            if (horizontalLine.find(v => v.possibles.length == 2 && v.possibles[0] == possibles[0] && v.possibles[1] == possibles[1])) {
                                let same = horizontalLine.find(v => v.possibles.length == 2 && v.possibles[0] == possibles[0] && v.possibles[1] == possibles[1])
                                let tempHorizontal = horizontalLine.filter(ver => ver.i !== same.i || ver.j !== same.j);
                                allPossibles = allPossibles.map(pos => {
                                    let found = false;
                                    for (let a = 0; a < tempHorizontal.length; a++) {
                                        if (pos.i ===  i && pos.j === tempHorizontal[a].j) found = true;
                                    }
                                    if (found) return {possibles: pos.possibles.filter(n => n != possibles[0] && n != possibles[1]), i:pos.i,j:pos.j};
                                    else return pos;
                            })
                            }

                            if (group.find(v => v.possibles.length == 2 && v.possibles[0] == possibles[0] && v.possibles[1] == possibles[1])) {
                                let same = group.find(v => v.possibles.length == 2 && v.possibles[0] == possibles[0] && v.possibles[1] == possibles[1])
                                let tempGroup = group.filter(ver => ver.i !== same.i || ver.j !== same.j);
                                    allPossibles = allPossibles.map(pos => {
                                    let found = false;
                                    for (let a = 0; a < tempGroup.length; a++) {
                                        if (pos.i == tempGroup[a].i && pos.j == tempGroup[a].j) found = true;
                                    }
                                    if (found) return {possibles: pos.possibles.filter(n => n != possibles[0] && n != possibles[1]), i:pos.i,j:pos.j};
                                    else return pos;
                            })
                            }
                        } else {
                            // check group
                            if (group.find(b => b.possibles.includes(num)) && group.filter(c => c.possibles.includes(num)).length == 1) {
                                let pair = group.find(v => v.possibles.includes(num))
                                if (horizontalLine.find(ho => ho.i == pair.i && ho.j == pair.j)) {
                                    let tempHorizontal = horizontalLine.filter(ho => ho.i != pair.i || ho.j !== pair.j);
                                    allPossibles = allPossibles.map(pos => {
                                        let found = false;
                                        for (let a = 0; a < tempHorizontal.length; a++) {
                                            if (pos.i ===  i && pos.j === tempHorizontal[a].j) found = true;
                                        }
                                        if (found) return {possibles: pos.possibles.filter(n => n != num), i:pos.i,j:pos.j};
                                        else return pos;
                                    })
                                }        
                                else if (verticalLine.find(ve => ve.i == pair.i && ve.j == pair.j)) {
                                    let tempVertical = verticalLine.filter(ver => ver.i !== pair.i || ver.j !== pair.j);
                                    allPossibles = allPossibles.map(pos => {
                                        let found = false;
                                        for (let a = 0; a < tempVertical.length; a++) {
                                            if (pos.i == tempVertical[a].i && pos.j == j) found = true;
                                        }
                                        if (found) return {possibles: pos.possibles.filter(n => n != num), i:pos.i,j:pos.j};
                                        else return pos;
                                    })
                                }
                                }      

                                // another possibility (for expert level (max) )

                                if (group.filter(a => a.possibles.includes(num)).length > 0) {
                                    let groupMems = group.filter(a => a.possibles.includes(num))
                                    let sameVertical = groupMems.filter(mem => mem.j == j);
                                    let sameHorizontal = groupMems.filter(mem => mem.i == i);
                                    if (sameVertical.length > 0) {
                                        let tempVer = verticalLine.filter(a => sameVertical.length == 2 ? a.i != sameVertical[0].i && a.i != sameVertical[1].i : a.i != sameVertical[0].i)
                                        if(!tempVer.find(a => a.possibles.includes(num))) {
                                            let tempGroup = group.filter(a => sameVertical.length == 2 ? a.i != sameVertical[0].i && a.i != sameVertical[1].i : a.i != sameVertical[0].i)
                                            allPossibles = allPossibles.map(pos => {
                                            let found = false;
                                            for (let a = 0; a < tempGroup.length; a++) {
                                                if (pos.i == tempGroup[a].i && pos.j == tempGroup[a].j) found = true;
                                            }
                                            if (found) return {possibles: pos.possibles.filter(n => n != num), i:pos.i,j:pos.j};
                                            else return pos;
                                            })
                                        }
                                    }
                                     if (sameHorizontal.length > 0) {
                                        let tempHor = horizontalLine.filter(a => sameHorizontal.length == 2 ? a.j != sameHorizontal[0].j && a.i != sameHorizontal[1].j : a.j != sameHorizontal[0].j)
                                        if(!tempHor.find(a => a.possibles.includes(num))) {
                                            let tempGroup = group.filter(a => sameHorizontal.length == 2 ? a.j != sameHorizontal[0].j && a.j != sameHorizontal[1].j : a.j != sameHorizontal[0].j)
                                            allPossibles = allPossibles.map(pos => {
                                            let found = false;
                                            for (let a = 0; a < tempGroup.length; a++) {
                                                if (pos.i == tempGroup[a].i && pos.j == tempGroup[a].j) found = true;
                                            }
                                            if (found) return {possibles: pos.possibles.filter(n => n != num), i:pos.i,j:pos.j};
                                            else return pos;
                                            })
                                        }
                                    }
                                
                                }

                            }
                        }
                        
                    }
                    
                }
            }
        }    
    }      

    checkCells()

    while (allPossibles.find(cell => cell.possibles.length >= 1)) {
        checkCells(allPossibles);
    }

    console.log(board[0].join("|"))
    console.log(board[1].join("|"))
    console.log(board[2].join("|"))
    console.log(board[3].join("|"))
    console.log(board[4].join("|"))
    console.log(board[5].join("|"))
    console.log(board[6].join("|"))
    console.log(board[7].join("|"))
    console.log(board[8].join("|"))
    console.log(allPossibles)
    return allPossibles.length > 0 ? "olmadi be" : "DONE !!"
}

// yapiyor - easy
// console.log(sudokuSolver([
//     ["-","-","9","-","-","2","-","-","5"],
//     ["5","3","8","-","6","4","-","-","9"],
//     ["1","6","2","-","-","-","-","3","-"],
//     ["-","-","3","-","2","7","-","-","-"],
//     ["-","5","4","6","-","-","1","-","-"],
//     ["-","-","7","-","1","5","3","4","-"],
//     ["3","-","-","8","-","1","9","-","6"],
//     ["7","-","-","3","-","-","8","5","-"],
//     ["-","9","1","-","-","-","4","7","-"],
// ]))

// yapiyor - medium
// console.log(sudokuSolver([
//     ["2","5","-","-","-","3","-","9","1"],
//     ["3","-","9","-","-","-","7","2","-"],
//     ["-","-","1","9","2","6","3","-","-"],
//     ["-","-","-","5","6","8","-","-","3"],
//     ["-","1","-","-","4","-","-","-","-"],
//     ["6","-","3","-","-","-","-","5","-"],
//     ["1","3","2","-","-","-","-","7","-"],
//     ["-","-","-","7","3","4","-","6","-"],
//     ["7","6","4","-","1","-","-","-","-"],
// ]))

// yapiyor - hard
// console.log(sudokuSolver([
//     ["-","-","-","-","-","-","6","8","-"],
//     ["-","-","-","-","7","3","-","-","9"],
//     ["3","-","9","-","-","-","-","4","5"],
//     ["4","9","-","-","-","-","-","-","-"],
//     ["8","-","3","-","5","-","9","-","2"],
//     ["-","-","-","-","-","-","-","3","6"],
//     ["9","6","-","-","-","-","3","-","8"],
//     ["7","-","-","6","8","-","-","-","-"],
//     ["-","2","8","-","-","-","-","-","-"],
// ]))


// sikintili - hard - some issues on it
// console.log(sudokuSolver([
//     ["-","-","7","-","-","-","3","-","2"],
//     ["2","-","-","-","-","5","-","1","-"],
//     ["-","-","-","8","-","1","4","-","-"],
//     ["-","1","-","-","9","6","-","-","8"],
//     ["7","6","-","-","-","-","9","4","9"],
//     ["-","2","8","-","3","-","-","-","-"],
//     ["-","-","-","1","-","3","-","-","-"],
//     ["8","-","1","-","6","-","-","-","-"],
//     ["-","-","-","7","-","-","-","6","3"],
// ]))


// expert - issues

// console.log(sudokuSolver([
//     ["-","-","-","-","6","-","-","2","7"],
//     ["-","-","-","-","-","-","-","-","5"],
//     ["-","-","4","-","9","1","-","8","-"],
//     ["-","-","8","-","-","-","-","-","4"],
//     ["-","-","-","4","3","-","-","-","-"],
//     ["-","7","-","-","8","-","-","3","-"],
//     ["3","-","-","-","-","9","-","-","1"],
//     ["7","2","-","1","-","-","-","-","-"],
//     ["-","9","-","-","-","-","2","-","-"],
// ]))