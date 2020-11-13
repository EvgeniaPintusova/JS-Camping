class Node {
    constructor(value, next = null){
        this.value = value;
        this.next = next;
    }
}
class List{
    constructor(root){
        this._length = 0;
        this.head = null;
        this.root = this.addNode(root);
    }
    addNode(value) {
        let node = new Node(value);
        let currentNode = this.head;
        if (!currentNode) {
            this.head = node;
            this._length++;
            return node;
        }
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        this._length++;
        if (length < this._length){return true;}
        else {return false;}
    }
    remove(position = this._length) {
        let currentNode = this.head;
        let length = this._length;
        let count = 1;
        let beforeNodeToDelete = null;
        let nodeToDelete = null;
        let deletedNode = null;

        if (position <=1 || position > length) {
            return false;
        }
        while (count < position) {
            beforeNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            currentNode = currentNode.next;
            count++;
        }
        beforeNodeToDelete.next = nodeToDelete.next;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this._length--;
        if (length > this._length){return true;}
        else {return false;}
    }
    print(){
        let  currentNode = this.head;
        let print = '';
        while (currentNode) {
            print += (currentNode.value).toString()+',\t';
            currentNode = currentNode.next;
        }
        console.log(print);
    }
}

let list = new List(5);
console.log(list.addNode(2));
list.addNode(54);
list.addNode(4);
list.addNode(94);
list.addNode(43);
list.addNode(14);
list.addNode(-34);
list.print();
console.log(list.remove(5));
list.print();


