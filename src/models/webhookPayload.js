"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WebhookPayload extends Model {
    static associate(models) {
      // define association here
    }
  }
  WebhookPayload.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      amount: DataTypes.FLOAT,
      currency: DataTypes.STRING,
      created_at_time: DataTypes.INTEGER,
      timestamp: DataTypes.INTEGER,
      cause: DataTypes.STRING,
      full_name: DataTypes.STRING,
      account_name: DataTypes.STRING,
      invoice_url: DataTypes.STRING,
      received_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "WebhookPayload",
      tableName: "webhook_payloads",
      timestamps: false,
    }
  );
  return WebhookPayload;
};
