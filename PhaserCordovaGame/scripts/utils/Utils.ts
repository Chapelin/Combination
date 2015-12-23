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
    }
}