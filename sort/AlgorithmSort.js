class AlgorithmSort {
    /** Пузырьковая сортировка */
    bubble(arr) {
      for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
          if (arr[i] > arr[i + 1]) {
            this.swap(arr, i, i + 1);
          }
        }
      }
      return arr;
    }
  
    /** Шейкерная сортировка */
    cocktailSort(arr) {
      var left = 0;
      var right = arr.length - 1;
      while (left < right) {
        for (var i = left; i < right; i++) {
          if (arr[i] > arr[i + 1]) {
            this.swap(arr, i, i + 1);
          }
        }
        right--;
        for (var i = right; i > left; i--) {
          if (arr[i] < arr[i - 1]) {
            this.swap(arr, i, i - 1);
          }
        }
        left++;
      }
      return arr;
    }
  
    /** Сортировка выбором */
    selection(arr) {
      for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[min]) {
            min = j;
          }
        }
        if (min != i) {
          this.swap(arr, i, min);
        }
      }
      return arr;
    }
  
    /** Сортировка методом вставки */
    insert(arr) {
      for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > current) {
          arr[j] = arr[j - 1];
          j--;
        }
        arr[j] = current;
      }
      return arr;
    }
  
    swap(arr, i, j) {
      var swap = arr[i];
      arr[i] = arr[j];
      arr[j] = swap;
    }
  }