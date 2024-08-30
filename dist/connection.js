"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("./config");
class RabbitMQConnection {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected && this.channel)
                return;
            else
                this.connected = true;
            try {
                console.log(`⌛️ Connecting to Rabbit-MQ Server`);
                this.connection = yield amqplib_1.default.connect(`amqp://${config_1.rmqUser}:${config_1.rmqPass}@${config_1.rmqhost}:5672`);
                console.log(`✅ Rabbit MQ Connection is ready`);
                this.channel = yield this.connection.createChannel();
                console.log(`🛸 Created RabbitMQ Channel successfully`);
            }
            catch (error) {
                console.error(error);
                console.error(`Not connected to MQ Server`);
            }
        });
    }
    sendToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.channel) {
                    yield this.connect();
                }
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
const mqConnection = new RabbitMQConnection();
exports.default = mqConnection;
