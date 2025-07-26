import { IgApiClient } from 'instagram-private-api';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME);

const SESSION_PATH = './ig-session.json';

export async function loginToInstagram() {
  console.log('Logging to Instagram...');

  try {
    const savedSession = await fs.readFile(SESSION_PATH, 'utf-8');
    await ig.state.deserialize(JSON.parse(savedSession));
    console.log('Previous session loaded from file!');
  } catch (error) {
    console.log('No saved session. Logging in with username and password...');
    try {
      await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
      const sessionData = await ig.state.serialize();
      delete sessionData.constants;
      await fs.writeFile(SESSION_PATH, JSON.stringify(sessionData));
      console.log('Logged in successfully! Session has been saved.');
    } catch (loginError) {
      console.error('Login failed:', loginError.message);
      throw loginError;
    }
  }
}

export { ig };
