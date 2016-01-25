module PhaserCordovaGame {
    export class Assert {

        /// Pete si valeur < min ou > MAX
        public static AssertBetween(valeur: number, min: number, max: number) {
            if (valeur < min || valeur > max) {
                throw new RangeError("La valeur "+valeur + " n'est pas dans la fourchette " + min + " - "+ max );
            }
        }
    }

    export class ArrayUtil {

        public static insert<T>(arrayToUpdate: Array<T>, element: T, position: number): Array<T> {
            Assert.AssertBetween(position, 0, arrayToUpdate.length);
            var firstPart = arrayToUpdate.slice(0, position);
            var secondePart = arrayToUpdate.slice(position, arrayToUpdate.length);
            var result = firstPart;
            result.push(element);
            secondePart.forEach((e, i, arr) => result.push(e));
            return result;
        } 

        public static contains<T>(arrayToTest: Array<T>, elementToFind: T): boolean {
            return arrayToTest.indexOf(elementToFind) !== -1;
        }

        public static containsArray<T>(arrayToTest: Array<Array<T>>, elementToFind: Array<T>): boolean {
            for (var i = 0; i < arrayToTest.length; i++) {
                var elem = arrayToTest[i];
                if (elem.length === elementToFind.length) {
                    var allOk = true;
                    for (var j = 0; j < elem.length; j++) {
                        allOk = allOk && (elem[j] == elementToFind[j]);
                    }
                    if (allOk)
                        return true;
                }
            }
            return false;
        }

        public static decalePiece(arrayOfPiece: Array<Piece>, indexMax: number, indexMin: number = 0) {
            for (var pos = indexMax; pos > indexMin; pos--) {
                arrayOfPiece[pos] = arrayOfPiece[pos - 1];
            }
            arrayOfPiece[indexMin] = null;
        }
    }
}