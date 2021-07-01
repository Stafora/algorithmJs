class Tree {
    constructor(data) {
      let node = new Node(data);
      this._root = node;
    }
  
    traverseDF(callback) {
      (function recurse(currentNode) {
        for (let i = 0, length = currentNode.children.length; i < length; i++) {
          recurse(currentNode.children[i]);
        }
  
        callback(currentNode);
      })(this._root);
    }
  
    traverseBF(callback) {
      let queue = new Queue();
  
      queue.enqueue(this._root);
  
      let currentTree = queue.dequeue();
  
      while (currentTree) {
        for (let i = 0, length = currentTree.children.length; i < length; i++) {
          queue.enqueue(currentTree.children[i]);
        }
  
        callback(currentTree);
        currentTree = queue.dequeue();
      }
    }
  
    contains(callback, traversal) {
      traversal.call(this, callback);
    }
  
    add(data, toData, traversal) {
      let child = new Node(data),
        parent = null,
        callback = function(node) {
          if (node.data === toData) {
            parent = node;
          }
        };
  
      this.contains(callback, traversal);
  
      if (parent) {
        parent.children.push(child);
        child.parent = parent;
      } else {
        throw new Error('Cannot add node to a non-existent parent.');
      }
    }
  
    remove(data, fromData, traversal) {
      let tree = this,
        parent = null,
        childToRemove = null,
        index;
  
      let callback = function(node) {
        if (node.data === fromData) {
          parent = node;
        }
      };
  
      this.contains(callback, traversal);
  
      if (parent) {
        index = findIndex(parent.children, data);
  
        if (index === undefined) {
          throw new Error('Node to remove does not exist.');
        } else {
          childToRemove = parent.children.splice(index, 1);
        }
      } else {
        throw new Error('Parent does not exist.');
      }
  
      return childToRemove;
    }
  
    findIndex(arr, data) {
      var index;
  
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
          index = i;
        }
      }
  
      return index;
    }
  }
  
  class Node {
    constructor(data) {
      this.data = data;
      this.parent = null;
      this.children = [];
    }
  }
  
  class Queue {
    constructor() {
      this._oldestIndex = 1;
      this._newestIndex = 1;
      this._storage = {};
    }
  
    size() {
      return this._newestIndex - this._oldestIndex;
    }
    enqueue(data) {
      this._storage[this._newestIndex] = data;
      this._newestIndex++;
    }
    dequeue() {
      let oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
  
      if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
  
        return deletedData;
      }
    }
  }
  
  /*
  *  EXAMPLE
  */
  /*
  var tree = new Tree('CEO');
  
  tree.add('VP of Happiness', 'CEO', tree.traverseBF);
  tree.add('VP of Finance', 'CEO', tree.traverseBF);
  tree.add('VP of Sadness', 'CEO', tree.traverseBF);
  
  tree.add('Director of Puppies', 'VP of Finance', tree.traverseBF);
  tree.add('Manager of Puppies', 'Director of Puppies', tree.traverseBF);
  
  console.log(tree);
  console.log(tree.findIndex(tree._root.children, 'VP of Happiness'));
  */