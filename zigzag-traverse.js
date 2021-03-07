// Helper Function

let reverser = (arr, ascending,i) => {
    if(ascending == false){
        arr.reverse();
        arr.push(i)
        arr.reverse();
    }else{
        arr.push(i)
    }

    return arr;
}

let checkInsertMiddle = (top, middle, bottom, triangle) => {
    if(middle.length != 0) {
        triangle = [...triangle,...top, ...middle, ...bottom]
    }else{
        triangle= [...triangle,...top, ...bottom]
    }

    return triangle;
}

// Time-Complexity = O(n/2(n/2 + 1))
let countAddReCount = (array) =>{

    let n = array.length;       // int                             | O(1)
    let ascending = true;       // bool  true, false               | O(1)
    let leftTriangle = [];      // array [0,1,2...,n(n-1)/2        | (n(n-1))/2 O(N(N-1)/2)
    let rightTriangle = [];     // array [inverse of LeftTriangle] | (n(n-1))/2 O(N(N-1)/2)
    let count = [];             // array [0,1,2...,n-1]            | O(N)

    for( let i = 0; i<n; i++ ){
        
        // Accumulator
        let top = []            // array [a, b]           | O(1)
        let middle = []         // array [c, d]           | O(1)
        let bottom = []         // array [e, f]           | O(1)
        let topRight = []       // array [inv(a), inv(b)] | O(1)
        let middleRight = []    // array [inv(c), inv(d)] | O(1)
        let bottomRight = []    // array [inv(e), inv(f)] | O(1)

        // Reverse the count array every cycle
        count = reverser(count, ascending, i)

        // Pointer to move around the count array [ 0,1,2,3,...n ]
        let locPtrLeft = 0;
        let locPtrRight = count.length - 1;
        
        // Formulae to know how many iteration we need in every cycle (Cycle/2, then we get ( Divider + Remainder)) 
        let h = ( Math.floor((i+1)/2) + ((i+1)%2) )  

        while(!(h < 1)){
            
            // Check if the number is [00,11,22,...,nn]
            if (locPtrLeft == locPtrRight){
                
                middle.push(array[count[locPtrLeft]][count[locPtrRight]])
                middleRight.push(array[n-1-count[locPtrLeft]][n-1-count[locPtrRight]])
                
            }else{
                
                top.push(array[count[locPtrLeft]][count[locPtrRight]])
                topRight.push(array[n-1-count[locPtrLeft]][n-1-count[locPtrRight]])
                
                bottom.unshift(array[count[locPtrRight]][count[locPtrLeft]])   
                bottomRight.unshift(array[n-1-count[locPtrRight]][n-1-count[locPtrLeft]])

            }

            locPtrLeft++;
            locPtrRight--;
            h--;

        }

        // Only for Last Loop
        if(i < n-1) rightTriangle = checkInsertMiddle(topRight, middleRight, bottomRight, rightTriangle);

        leftTriangle = checkInsertMiddle(top, middle, bottom, leftTriangle);
        count.reverse();
        ascending = !ascending;

    }

    return [...leftTriangle, ...rightTriangle.reverse()]

}


let array = [
    [1,3,4,10],
    [2,5,9,11],
    [6,8,12,15],
    [7,13,14,16]
]

console.log(countAddReCount(array));
