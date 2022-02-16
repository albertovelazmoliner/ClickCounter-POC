/* eslint-disable camelcase */
const { expect } = require('chai');
const fsp = require('fs').promises;
const { processData } = require('../dataProcessor');

describe('[Data Processor tests]', () => {
  const originalConsoleLog = console.log;
  before(() => {
    console.log = () => {};
  });
  afterEach(async () => {
    await fsp.rm('result​set.json');
  });
  after(() => {
    console.log = originalConsoleLog;
  });

  it('[DPT - 01] - processData writes a new file', async () => {
    await processData();
    const data = await fsp.readFile('result​set.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    expect(jsonData).to.be.an('array');
  });

  it('[DPT - 02] - processData remove repeated ips more than 10 times, so IP "22.22.22.22" is not present in result', async () => {
    await processData();
    const data = await fsp.readFile('result​set.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    expect(jsonData.filter((element) => element.ip === '22.22.22.22').length).to.equal(0);
  });

  it('[DPT - 03] - For each IP within each one hour period, only the most expensive click is placed into the result set. Check "11.11.11.11" in period 3', async () => {
    const originalClicksList = await fsp.readFile('./data/clicks.json', { encoding: 'utf-8' });
    const jsonOriginalClicksList = JSON.parse(originalClicksList);
    const firstClickOn11_11_11_11_at_2_12_32 = jsonOriginalClicksList[1];
    const firstClickOn11_11_11_11_at_2_13_11 = jsonOriginalClicksList[2];
    await processData();
    const data = await fsp.readFile('result​set.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    const find_firstClickOn11_11_11_11_at_2_12_32 = jsonData.find(
      (element) => element.ip === firstClickOn11_11_11_11_at_2_12_32.ip
        && element.timestamp === firstClickOn11_11_11_11_at_2_12_32.timestamp
        && element.amount === firstClickOn11_11_11_11_at_2_12_32.amount,
    );
    const find_firstClickOn11_11_11_11_at_2_13_11 = jsonData.find(
      (element) => element.ip === firstClickOn11_11_11_11_at_2_13_11.ip
      && element.timestamp === firstClickOn11_11_11_11_at_2_13_11.timestamp
      && element.amount === firstClickOn11_11_11_11_at_2_13_11.amount,
    );
    expect(firstClickOn11_11_11_11_at_2_12_32.amount).to.below(firstClickOn11_11_11_11_at_2_13_11.amount);
    expect(find_firstClickOn11_11_11_11_at_2_12_32).to.equal(undefined);
    expect(find_firstClickOn11_11_11_11_at_2_13_11)
      .to.be.deep.equal(firstClickOn11_11_11_11_at_2_13_11);
  });

  it('[DPT - 04] - If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set. Check "55.55.55.55" in period 14', async () => {
    const originalClicksList = await fsp.readFile('./data/clicks.json', { encoding: 'utf-8' });
    const jsonOriginalClicksList = JSON.parse(originalClicksList);
    const firstClickOn55_55_55_55_at_13_02_40 = jsonOriginalClicksList[19];
    const firstClickOn55_55_55_55_at_13_33_34 = jsonOriginalClicksList[21];
    const firstClickOn55_55_55_55_at_13_42_32 = jsonOriginalClicksList[22];
    
    await processData();
    const data = await fsp.readFile('result​set.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    const find_firstClickOn55_55_55_55_at_13_02_40 = jsonData.find(
      (element) => element.ip === firstClickOn55_55_55_55_at_13_02_40.ip
        && element.timestamp === firstClickOn55_55_55_55_at_13_02_40.timestamp
        && element.amount === firstClickOn55_55_55_55_at_13_02_40.amount,
    );

    const find_firstClickOn55_55_55_55_at_13_33_34 = jsonData.find(
      (element) => element.ip === firstClickOn55_55_55_55_at_13_33_34.ip
        && element.timestamp === firstClickOn55_55_55_55_at_13_33_34.timestamp
        && element.amount === firstClickOn55_55_55_55_at_13_33_34.amount,
    );

    const find_firstClickOn55_55_55_55_at_13_42_32 = jsonData.find(
      (element) => element.ip === firstClickOn55_55_55_55_at_13_42_32.ip
        && element.timestamp === firstClickOn55_55_55_55_at_13_42_32.timestamp
        && element.amount === firstClickOn55_55_55_55_at_13_42_32.amount,
    );

    expect(firstClickOn55_55_55_55_at_13_02_40.amount).to.equal(firstClickOn55_55_55_55_at_13_33_34.amount);
    expect(firstClickOn55_55_55_55_at_13_02_40.amount).to.equal(firstClickOn55_55_55_55_at_13_42_32.amount);
    expect(firstClickOn55_55_55_55_at_13_33_34.amount).to.equal(firstClickOn55_55_55_55_at_13_42_32.amount);

    expect(find_firstClickOn55_55_55_55_at_13_02_40)
      .to.be.deep.equal(firstClickOn55_55_55_55_at_13_02_40);
    expect(find_firstClickOn55_55_55_55_at_13_33_34).to.equal(undefined);
    expect(find_firstClickOn55_55_55_55_at_13_42_32).to.equal(undefined);
  });
});
