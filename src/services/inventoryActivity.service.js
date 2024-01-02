import inventoryLeaveVoucher from "../models/inventoryLeaveVoucher.model.js";
import inventoryComeVoucher from '../models/inventoryComeVoucher.model.js';
import inventoryItem from "../models/inventoryItem.model.js";
import inventoryDeleteVoucher from "../models/inventoryDeleteVoucher.model.js";
import item from "../models/item.model.js";

import {
    updateQuantityinventoryItem, findinventoryItemById
} from "../models/repositories/inventoryItem.repo.js"
import { convertToObjectId } from "../utils/index.js";

class inventoryActivityService {
    // Come Voucher: (create new InventoryItem, created time, creator)
    static async createComeVoucher(infoCvoucher) {
        const { userId, item_list} = infoCvoucher;
        const newComeVoucher = await inventoryComeVoucher.create({
            user_id: convertToObjectId(userId),
        });
        for (let item of item_list) {
            const newInventoryItem = await inventoryItem.create({
                inventoryItem_name: item.inventoryItem_name,
                inventoryItem_quantity: item.inventoryItem_quantity,
                inventoryItem_exp: item.inventoryItem_exp,
                cost: item.cost
            });
            newComeVoucher.come_list.push({
                inventoryItem_name: item.inventoryItem_name,
                inventoryItem_quantity: item.inventoryItem_quantity,
                inventoryItem_exp: item.inventoryItem_exp,
                cost: item.cost
            });
        }
        await newComeVoucher.save();
        return newComeVoucher;
    }
    static async getAllComeVoucher(){
        return inventoryComeVoucher.find({});
    }
    // Leave Voucher: update quantity of InventoryItem, time and updater
    static async createLeaveVoucher(infoLvoucher) {
        const { userId, item_list } = infoLvoucher;
        const leaveItemAct = await inventoryLeaveVoucher.create({
            user_id: convertToObjectId(userId),
        });
        for (let element of item_list) {
            const invenItem = await findinventoryItemById(convertToObjectId(element.inventoryItem));
            
            const newItem = await item.create({
                item_name: invenItem.inventoryItem_name,
                item_price: element.price,
                item_quantity: element.item_quantity,
                item_cost: invenItem.cost,
                item_type: "inven"
            });
            await updateQuantityinventoryItem(convertToObjectId(element.inventoryItem), - element.item_quantity);
            leaveItemAct.leave_list.push({
                inventoryItem: convertToObjectId(element.inventoryItem),
                cost : invenItem.cost,
                quantity:element.item_quantity,
                price: element.price,
            })
        }
        await leaveItemAct.save();     
        return leaveItemAct;
    }
    static async getAllLeaveVoucher(){
        return inventoryLeaveVoucher.find({});
    }
    static async getOneLeaveVoucher(Time){
        return inventoryLeaveVoucher.findOne({createdAt: Time})
    }
    // Delete Voucher: Delete InventoryItem, time and deleter
    static async createDeleteVoucher(infoDvoucher) {
        const { userId, item_list } = infoDvoucher;
        const deleteItemAct = await inventoryDeleteVoucher.create({
            user_id: convertToObjectId(userId),
        });
        for(let item of item_list){
            var deleteItem = await findinventoryItemById(item.inventoryItem);
            var Quantity = deleteItem.inventoryItem_quantity;
            deleteItemAct.delete_list.push({inventoryItem: item.inventoryItem, quantity: Quantity});
            await inventoryItem.findOneAndDelete({ _id: convertToObjectId(item.inventoryItem) });
        }
        await deleteItemAct.save();
        return deleteItemAct;
    }
    static async getAllDeleteVoucher(){
        return inventoryDeleteVoucher.find({});
    }
}
export default inventoryActivityService;
