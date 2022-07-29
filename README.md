# ⚡ LightningCelo ⚡ 🌱

LINK TO DECK: [LINK TO THE DECK](https://www.canva.com/design/DAFEipAze-0/JrWjRxm6KhIaqvJEZVk4yw/view?utm_content=DAFEipAze-0&utm_campaign=designshare&utm_medium=link&utm_source=publishpresent)

Enabling your $cUSD to flow like the river in real time. Let's make money more beautiful than ever.
<p align="center">
  <a href="/">
    <img src="./lightning.png" alt="Logo" width="150" height="200">
  </a>
</p>

  <p>View the project demo on <a href="https://youtu.be/R0f7ebKkzVw">YouTube</a></p>
</p>

**How to run locally**
1. Navigate to interface in your terminal using `cd interface`

2. `yarn && yarn dev`

`Our contracts have been deployed to Celo Alfajores Testnet`

[Celo Alfajores Testnet 0x671580C2d0e99Bb17690B5D4D805F1902d26f5b0](https://alfajores-blockscout.celo-testnet.org/address/0x671580C2d0e99Bb17690B5D4D805F1902d26f5b0/transactions)


## Imagine your cUSD on steroids
<p>
<img width="200" height="200" alt="image" src="https://user-images.githubusercontent.com/43913734/175611369-9480fa60-5848-4d8d-8e24-b57374f650bc.gif">
<img width="200" height="200" alt="image" src="https://user-images.githubusercontent.com/43913734/175611455-6a0fd530-f7bf-4ce6-adb4-f9d0121a83a9.gif">
<img width="200" height="200" alt="image" src="https://user-images.githubusercontent.com/43913734/175613000-0323aa4d-008f-44e6-9be4-a7c115c55488.gif">
</p>

### How can we help?
<img width="868" alt="image" src="https://user-images.githubusercontent.com/43913734/175610687-00bca45e-2c70-40f0-83bf-964f33cc9206.png">

### Description 

- Stream cUSD from one wallet to another in real time
- You can connect your wallet to the platfrom running on Celo Alfajores Network.
- You can view an ongoing recurring stream by referencing to the created streamID else you can create a new stream.
- To start the stream, you have to enter:
    - The receipient's wallet address
    - The token that you want to stream. For now we enable cUSD flows on Alfajores Testnetwork
    - The amount of token you want to stream (say: 10cUSD)
    - The time you want the stream to end. Let's say you start the stream at `x` seconds. You choose a time interval of `x+T` for the stream to end, where       both `x` and `T` can be measured in seconds and can amount to minutes, hours, days, weeks, months, years, and even centuries.
    - The token stream would be live for `T` duration of time
    - The platform also displays the `total number of token streamed` and the `amount of tokens remaining for withdrawal` in real time.
    - If `y` is the total number of tokens to be streamed, then you can withdraw a certain amount of token, let's say `x` tokens out `y` at a time, and             then, another `z` amount of tokens out of the remaining `y-x` tokens. `Tokens` here refers to `$cUSD` on Alfajores Test Network.
    - Once the stream ends, the entire token is to be withdrawn to the receipients wallet, and then the platform would redirect you to create a new stream.

### Technical specs
**A money stream has six properties:**

1. Sender.
2. Recipient.
3. Fixed deposit amount.
4. ERC-20 token used as streaming currency.
5. Start time
6. Stop Time



A. Smart Contract Deployed to [Celo Alfajores Testnet 0x671580C2d0e99Bb17690B5D4D805F1902d26f5b0](https://alfajores-blockscout.celo-testnet.org/address/0x671580C2d0e99Bb17690B5D4D805F1902d26f5b0/transactions)
<img width="1440" alt="Screenshot 2022-06-24 at 11 25 29 PM" src="https://user-images.githubusercontent.com/43913734/175616457-a08f5429-eb03-4828-ace3-e4d0394602f4.png">

B. We use `Celo Contract Kit` and `Truffle` to deploy our contracts to Celo Alfajores testnet, `web3js`, `wagmi.js` and `ethers` to interact with the smart contract.

C. The front end is built on `React`, and `Chakra UI`, and many third part libraries.


### Future Plans
- To enable multiple streams and display status of recurring multiple streams in real time.
- To enable streaming for other tokens on the Celo Network, like $CELO, $cEUR, $cREAL, $PACT, and many more.
- To expand the use cases of LightningCelo to projects building on Celo

### Screenshots

1. Sender's wallet has 14 $cUSD. Sender wants to start a stream of 5 $cUSD
<img width="1440" alt="Screenshot 2022-06-24 at 11 56 44 PM" src="https://user-images.githubusercontent.com/43913734/175644490-9bde17e8-e2fd-416e-8b83-b5b2e5d10cd3.png">

2. Sender enters the details of the receipient, start and end time, and amount to be streamed, and creates a recurring stream of tokens in real time to the receiver's wallet.
<img width="1440" alt="Screenshot 2022-06-24 at 11 58 35 PM" src="https://user-images.githubusercontent.com/43913734/175644663-de0ab2f1-6e8e-463e-9192-d05fca89682b.png">

<img width="1440" alt="Screenshot 2022-06-24 at 11 58 56 PM" src="https://user-images.githubusercontent.com/43913734/175646250-451d937d-64a4-4b63-9629-ba412354eeac.png">

![Screenshot 2022-06-24 at 11 59 35 PM](https://user-images.githubusercontent.com/43913734/175646282-3b03b5fb-ca9b-4dde-b6cc-3dc90fd9bce3.png)

3. Stream starts initially with 0 cUSD streamed and 0 cUSD withdrawable, local time `23:30pm (IST - Indian Standard Time)`
![image](https://user-images.githubusercontent.com/43913734/175645129-91b1e12c-0d63-4a1f-a310-66f1a25aff15.png)

4. Middle of the stream, we see that 1.6cUSD has been streamed already and 1.6cUSD is withdrawable.
![image](https://user-images.githubusercontent.com/43913734/175645210-1743aae4-56cb-4069-85e4-8e37126f8652.png)

5. Meanwhile receiver claimed 1.63cUSD of the stream, midway, and the stream finished in two minutes (`23:33 local time IST- Indian Standard Time`). The receiver is yet to claim 3.37 cUSD. After claiming the remaining cUSD, the streamID, expires and the user can create another stream
![image](https://user-images.githubusercontent.com/43913734/175645811-157610a0-57e0-438a-8f58-a47a13d0b0e4.png)
![image](https://user-images.githubusercontent.com/43913734/175645768-2d618550-31a2-46a5-b730-04d067519629.png)
![image](https://user-images.githubusercontent.com/43913734/175645834-7c97f7d0-045c-4697-9d16-8807ffdaf77b.png)

6. So the protocol enables a user to stream money in real time as well as withdraw money at any instant. Look at the potential use case above. Also watch the demo video linked above.



