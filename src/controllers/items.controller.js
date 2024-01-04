import SuccessResponse from "../core/success.response.js";
import ItemService from "../services/item.service.js";

class ItemController {
  static async createItems(req, res) {
    const results = await ItemService.createItems(req.body.listItems);

    new SuccessResponse({
      message: "Created items successfully!",
      data: results,
    }).send(res);
  }

  static async getItems(req, res) {
    const results = await ItemService.getItemByType(req.params.type);

    new SuccessResponse({
      message: "Get items successfully!",
      data: results,
    }).send(res);
  }

  static async updateItem(req, res) {
    const data = await ItemService.updateItem({
      itemId: req.params.id,
      updateInfo: req.body,
    });

    new SuccessResponse({
      message: "Update item successfully!",
      data,
    }).send(res);
  }

  static async deleteItem(req, res) {
    const data = await ItemService.deleteItem(req.params.id);

    new SuccessResponse({
      message: "Delete item successfully!",
      data,
    }).send(res);
  }
  static async deleteItemMain(req, res) {
    await ItemService.deleteItemMain();
    new SuccessResponse({
      message: "Delete daily item successfully!",
    }).send(res);
  }
}

export default ItemController;
