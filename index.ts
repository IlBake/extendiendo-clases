import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";
class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  //extender el constructor original para que además de recibir un nombre para la lista, 
  //lea el archivo products.json y agregue todos los productos del JSON usando el método 
  //addProduct.
  constructor(name: string){
    super(name);
    const listaDelArchivo = fs
    .readFileSync(__dirname + "/products.json")
    .toString();
    const productosDelArchivo = JSON.parse(listaDelArchivo);
    productosDelArchivo.forEach(p => {
      this.addProduct(p);
    })
      
    };
   // tener un método addProduct que reciba una instancia de la clase Product 
  //como parámetro y la agregue usando el método add que ya existe en la superclase. 
  //El método debe validar que no exista un producto con el mismo id antes de agregarlo.
   addProduct(product: Product){
    this.add(product);
   }
    //tener un método getProduct(id:number):Product que devuelva el producto con ese id.
    getProduct(id:number):Product {
      const cosas = this.getCosas();
      return cosas.find((c) => (c.id == id));
    
   }
  // tener un método removeProduct(id:number):Product que elimine el producto con ese id.
  removeProduct(id:number) {
    const nuevo = remove(this.cosas, (c) => c.id == id);
    console.log(nuevo)
  }
 //tener un método getSortedByPrice que reciba un parámetro order:string 
 //con solo dos valores posibles: asc o desc. (Chequear este link)
 // esto sirve para ordernarlo por la propiedad que desees, en este caso por el precio.-
 getSortedByPrice(order:"asc" | "desc"){
  return orderBy(this.cosas, ["price"],[order]);
 }

}

export { ListaDeProductos, Product };
