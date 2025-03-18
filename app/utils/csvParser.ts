// app/utils/csvParser.ts

import fs from 'fs';
import csv from 'csv-parser';

const CHUNK_SIZE = 1000; // Number of rows to process per chunk
const OUTPUT_DIR = 'app/data';

export async function parseCsvInChunks(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let chunkIndex = 0;
    console.log('Creating read stream for:', filePath);
    const stream = fs.createReadStream(filePath).pipe(csv({skipLines: 3}));
    const chunks: any[][] = [];
    let currentChunk: any[] = [];

    stream.on('data', (row: any) => {
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
      const processNextChunk = async () => {
        if (chunks.length === 0) {
          console.log('No more chunks to process.');
          resolve();
          return;
        }

        const chunk = chunks.shift();
        if (chunk) {
          try {
            console.log('Processing chunk:', chunkIndex);
            await pauseAndWriteChunk(chunk, chunkIndex);
            chunkIndex++;
            await processNextChunk(); // Process next chunk
          } catch (error) {
            console.error('Error processing chunk:', error);
            reject(error);
          }
        } else {
          console.log('No chunk to process, resolving.');
          resolve();
        }
      };

      processNextChunk();
    });

    stream.on('error', (error: any) => {
      console.error('Stream error:', error);
      reject(error);
    });
  });
}

async function pauseAndWriteChunk(chunk: any[], chunkIndex: number): Promise<void> {
  const fileName = `${OUTPUT_DIR}/food_data_chunk_${chunkIndex}.json`;
  const jsonData = JSON.stringify(chunk, null, 2);
  console.log(`Writing chunk ${chunkIndex} to ${fileName}`);

  return new Promise<void>((resolve, reject) => {
    fs.writeFile(fileName, jsonData, (err: any) => {
      if (err) {
        console.error(`Error writing chunk to ${fileName}:`, err);
        reject(err);
      } else {
        console.log(`Chunk saved to ${fileName}`);
        resolve();
      }
    });
  });
}
