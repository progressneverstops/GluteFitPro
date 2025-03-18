"use strict";
// app/utils/csvParser.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvInChunks = void 0;
const fs = __importStar(require("fs"));
const csv = require('csv-parser');
const CHUNK_SIZE = 1000; // Number of rows to process per chunk
const OUTPUT_DIR = 'app/data';
function parseCsvInChunks(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let chunkIndex = 0;
            console.log('Creating read stream for:', filePath);
            const stream = fs.createReadStream(filePath).pipe(csv({}));
            const chunks = [];
            let currentChunk = [];
            stream.on('data', (row) => {
                console.log('Data received:', row);
                currentChunk.push(row);
                if (currentChunk.length >= CHUNK_SIZE) {
                    console.log('Chunk is full, processing...');
                    chunks.push([...currentChunk]); // Create a copy to avoid modification issues
                    currentChunk = [];
                }
            });
            stream.on('end', () => {
                console.log('Stream ended.');
                if (currentChunk.length > 0) {
                    chunks.push([...currentChunk]);
                }
                // Process chunks sequentially
                const processNextChunk = () => __awaiter(this, void 0, void 0, function* () {
                    if (chunks.length === 0) {
                        console.log('No more chunks to process.');
                        resolve();
                        return;
                    }
                    const chunk = chunks.shift();
                    if (chunk) {
                        try {
                            console.log('Processing chunk:', chunkIndex);
                            yield pauseAndWriteChunk(chunk, chunkIndex);
                            chunkIndex++;
                            yield processNextChunk(); // Process next chunk
                        }
                        catch (error) {
                            console.error('Error processing chunk:', error);
                            reject(error);
                        }
                    }
                    else {
                        console.log('No chunk to process, resolving.');
                        resolve();
                    }
                });
                processNextChunk();
            });
            stream.on('error', (error) => {
                console.error('Stream error:', error);
                reject(error);
            });
        });
    });
}
exports.parseCsvInChunks = parseCsvInChunks;
function pauseAndWriteChunk(chunk, chunkIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = `${OUTPUT_DIR}/food_data_chunk_${chunkIndex}.json`;
        const jsonData = JSON.stringify(chunk, null, 2);
        console.log(`Writing chunk ${chunkIndex} to ${fileName}`);
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, jsonData, (err) => {
                if (err) {
                    console.error(`Error writing chunk to ${fileName}:`, err);
                    reject(err);
                }
                else {
                    console.log(`Chunk saved to ${fileName}`);
                    resolve();
                }
            });
        });
    });
}
