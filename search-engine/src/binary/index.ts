class BinarySearch {
  static search(arr: string[], word: string, left = 0, right = 0): number {
    if (right == 0) {
      right = arr.length - 1
    }

    var m = Math.floor((left + right) / 2)

    if (right >= left) {
      if (arr[m] == word) {
        return m
      } else if (word > arr[m]) {
        return this.search(arr, word, m + 1, right)
      } else {
        return this.search(arr, word, left, m - 1)
      }
    } else {
      return -1
    }
  }
}

export default BinarySearch