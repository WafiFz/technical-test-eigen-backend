import { DataSource } from 'typeorm';
import { seedBooks } from './book.seed';
import { databaseConfig } from '../database.config';
import { dataSource } from '../database.source';
import { seedMembers } from './member.seed';

const runSeeds = async (dataSource: DataSource) => {
  await seedBooks(dataSource);
  await seedMembers(dataSource);
};

const initializeDataSource = async (): Promise<DataSource> => {
  try {
    await dataSource.initialize();
    return dataSource;
  } catch (error) {
    console.error('Error initializing data source:', error);
    process.exit(1);
  }
};

const main = async () => {
  const initializedDataSource = await initializeDataSource();
  try {
    await runSeeds(initializedDataSource);
    console.log('Seeds executed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
  } finally {
    await initializedDataSource.destroy();
    process.exit(0);
  }
};

main();
