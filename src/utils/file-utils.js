"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const fs_1 = __importDefault(require("fs"));
class FileUtils {
    static readFileAtPath(filePath) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const rows = data.trim().split('\n').map(line => line.trim());
                resolve(rows);
            });
        });
    }
}
exports.FileUtils = FileUtils;
