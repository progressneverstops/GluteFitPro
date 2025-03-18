const fs = require('fs');
const csv = require('csv-parser');

const CHUNK_SIZE = 1000;
const OUTPUT_DIR = 'app/data';

async function parseCsvInChunks(filePath) {
  return new Promise((resolve, reject) => {
    let chunkIndex = 0;
    console.log('Creating read stream for:', filePath);
    const stream = fs.createReadStream(filePath).pipe(csv({ skipLines: 3 }));
    const chunks = [];
    let currentChunk = [];

    stream.on('data', (row) => {
      console.log('Data received:', row);
      currentChunk.push(row);
      if (currentChunk.length >= CHUNK_SIZE) {
        console.log('Chunk is full, processing...');
        chunks.push([...currentChunk]);
        currentChunk = [];
      }
    });

    stream.on('end', () => {
      console.log('Stream ended.');
      if (currentChunk.length > 0) {
        chunks.push([...currentChunk]);
      }

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
            await processNextChunk();
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

    stream.on('error', (error) => {
      console.error('Stream error:', error);
      reject(error);
    });
  });
}

async function pauseAndWriteChunk(chunk, chunkIndex) {
  const fileName = `${OUTPUT_DIR}/food_data_chunk_${chunkIndex}.json`;
  const jsonData = JSON.stringify(chunk, null, 2);
  console.log(`Writing chunk ${chunkIndex} to ${fileName}`);

  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, jsonData, (err) => {
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

module.exports = { parseCsvInChunks };
