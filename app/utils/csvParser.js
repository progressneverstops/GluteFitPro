"use strict";
// app/utils/csvParser.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.parseCsvInChunks = void 0;
var fs = require("fs");
var csv = require('csv-parser');
var CHUNK_SIZE = 1000; // Number of rows to process per chunk
var OUTPUT_DIR = 'app/data';
function parseCsvInChunks(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var chunkIndex = 0;
                    console.log('Creating read stream for:', filePath);
                    var stream = fs.createReadStream(filePath).pipe(csv({}));
                    var chunks = [];
                    var currentChunk = [];
                    stream.on('data', function (row) {
                        console.log('Data received:', row);
                        currentChunk.push(row);
                        if (currentChunk.length >= CHUNK_SIZE) {
                            console.log('Chunk is full, processing...');
                            chunks.push(__spreadArray([], currentChunk, true)); // Create a copy to avoid modification issues
                            currentChunk = [];
                        }
                    });
                    stream.on('end', function () {
                        console.log('Stream ended.');
                        if (currentChunk.length > 0) {
                            chunks.push(__spreadArray([], currentChunk, true));
                        }
                        // Process chunks sequentially
                        var processNextChunk = function () { return __awaiter(_this, void 0, void 0, function () {
                            var chunk, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (chunks.length === 0) {
                                            console.log('No more chunks to process.');
                                            resolve();
                                            return [2 /*return*/];
                                        }
                                        chunk = chunks.shift();
                                        if (!chunk) return [3 /*break*/, 6];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        console.log('Processing chunk:', chunkIndex);
                                        return [4 /*yield*/, pauseAndWriteChunk(chunk, chunkIndex)];
                                    case 2:
                                        _a.sent();
                                        chunkIndex++;
                                        return [4 /*yield*/, processNextChunk()];
                                    case 3:
                                        _a.sent(); // Process next chunk
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_1 = _a.sent();
                                        console.error('Error processing chunk:', error_1);
                                        reject(error_1);
                                        return [3 /*break*/, 5];
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        console.log('No chunk to process, resolving.');
                                        resolve();
                                        _a.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); };
                        processNextChunk();
                    });
                    stream.on('error', function (error) {
                        console.error('Stream error:', error);
                        reject(error);
                    });
                })];
        });
    });
}
exports.parseCsvInChunks = parseCsvInChunks;
function pauseAndWriteChunk(chunk, chunkIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var fileName, jsonData;
        return __generator(this, function (_a) {
            fileName = "".concat(OUTPUT_DIR, "/food_data_chunk_").concat(chunkIndex, ".json");
            jsonData = JSON.stringify(chunk, null, 2);
            console.log("Writing chunk ".concat(chunkIndex, " to ").concat(fileName));
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.writeFile(fileName, jsonData, function (err) {
                        if (err) {
                            console.error("Error writing chunk to ".concat(fileName, ":"), err);
                            reject(err);
                        }
                        else {
                            console.log("Chunk saved to ".concat(fileName));
                            resolve();
                        }
                    });
                })];
        });
    });
}
