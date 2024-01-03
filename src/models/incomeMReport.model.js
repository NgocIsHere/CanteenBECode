import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "mIncomeReport";
const COLLECTION_NAME = "mIncomeReports";

const reportItemSchema = new Schema(
    {
      user_id:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      sale_quantity:{
        type: Number, // Số lượng lấy từ order
        required: true,
      },
      loss_quantity:{
        type: Number, // lấy quantity món nấu
        required: true,
      },
      income:{
        type: Number,
        required: true,
      },
      profit:{
        type: Number, // 
        required: true,
      },
      loss_money:{
        type: Number,
        required: true,
      }
    },  
    {
      timestamps: true,
      collection: COLLECTION_NAME,
    }
  );
  const mIncomeReport = model(DOCUMENT_NAME, reportItemSchema);

export default mIncomeReport;