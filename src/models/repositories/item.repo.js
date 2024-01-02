import item from "../item.model.js";

const findItemByName = async (name) => {
  return await item.findOne({ item_name: name }).lean();
};

const findItemById = async (id) => {
  return await item.findOne({ _id: id }).lean();
};

const updateQuantityItem = async (name, quantity) => {
  return await item.findOneAndUpdate(
    { item_name: name },
    {
      $inc: {
        item_quantity: quantity,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
};

const updateItem = async ({ itemId, updateInfo }) => {
  const filter = { _id: itemId };
  const updateSet = { new: true, upsert: true };

  return await item.findOneAndUpdate(filter, updateInfo, updateSet);
};

export { findItemByName, updateQuantityItem, updateItem, findItemById };
