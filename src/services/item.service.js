import item from "../models/item.model.js";
import {
  findItemByName,
  updateItem,
  updateQuantityItem,
} from "../models/repositories/item.repo.js";

class ItemService {
  static async createItems(listItems) {
    const results = [];

    for (const element of listItems) {
      element.item_name = element.item_name.toLowerCase();
      const existedItem = await findItemByName(element.item_name);

      if (existedItem) {
        const updatedItem = await updateQuantityItem(
          element.item_name,
          element.item_quantity
        );
        results.push(updatedItem);
      } else {
        const newItem = await item.create(element);
        results.push(newItem);
      }
    }
    return results;
  }

  static async getItemByType(type) {
    return item.find({ item_type: type }).lean();
  }

  static async updateItem({ itemId, updateInfo }) {
    return updateItem({ itemId, updateInfo });
  }

  static async deleteItem(itemId) {
    return item.findOneAndDelete({ _id: itemId });
  }
  static async deleteItemMain() {
    const listMain = item.find({item_type: "main"}).lean();
    for(const mItem of listMain){
      item.findOneAndDelete({ _id: mItem._id });
    }
  }
}

export default ItemService;
