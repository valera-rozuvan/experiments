const { SpinnerComponent } = await import('./SpinnerComponent.js');

const MetamaskComponent = {
  data: () => ({}),
  methods: {
    metamaskLogin() {
      this.setMetamaskConnectionError('');
      this.setMetamaskAccountAddress('');

      (async () => {
        await this.getAccount();
      })();

      this.setIsLoading(true);
    },
    sendTrx() {
      this.setTransactionError('');
      this.setTransactionHash('');

      (async () => {
        await this.tryToSendTrx(
          this.metamaskAccountAddress, // current Metamask wallet address
          this.recipientAddress, // recipient address
          this.amountWeiToSend // amount to send in Wei
        );

        this.setIsLoading(true);
      })();
    },
    onRecipientInputCh(event) {
      this.setRecipientAddress(event.target.value);
    },
    onAmountInputCh(event) {
      this.setAmountWeiToSend(event.target.value);
    }
  },
  setup() {
    const recipientAddress = Vue.ref('');
    function setRecipientAddress(_value) {
      recipientAddress.value = _value;
    }

    const amountWeiToSend = Vue.ref('');
    function setAmountWeiToSend(_value) {
      amountWeiToSend.value = _value;
    }

    // Wallet address of connected Metamask.
    const metamaskAccountAddress = Vue.ref('');
    function setMetamaskAccountAddress(_value) {
      metamaskAccountAddress.value = _value;
    }

    // From the start, we don't know if Metamask is supported.
    const isMetamaskSupported = Vue.ref(false);
    function setIsMetamaskSupported(_value) {
      isMetamaskSupported.value = _value;
    }

    // From the start, the site is not connected to a Metamask account.
    const isMetamaskConnected = Vue.ref(false);
    function setIsMetamaskConnected(_value) {
      isMetamaskConnected.value = _value;
    }

    const metamaskConnectionError = Vue.ref(false);
    function setMetamaskConnectionError(_value) {
      metamaskConnectionError.value = _value;
    }

    // While we figure out if Metamask is available, we show a spinning loader.
    const isLoading = Vue.ref(true);
    function setIsLoading(_value) {
      isLoading.value = _value;
    }

    // If Metamask is not found, we will ask the use to install it.
    const pleaseInstallMetamask = Vue.ref(false);
    function setPleaseInstallMetamask(_value) {
      pleaseInstallMetamask.value = _value;
    }

    const multipleWalletsDetected = Vue.ref(false);
    function setMultipleWalletsDetected(_value) {
      multipleWalletsDetected.value = _value;
    }

    const transactionError = Vue.ref('');
    function setTransactionError(_value) {
      transactionError.value = _value;
    }

    const transactionHash = Vue.ref('');
    function setTransactionHash(_value) {
      transactionHash.value = _value;
    }

    async function detectEP() {
      let provider = null;
      try {
        provider = await detectEthereumProvider();
      } catch (err) {
        console.error('Something bad happened while executing `detectEthereumProvider` function.');
        console.error(err);

        return null;
      }
      return provider;
    }

    async function getAccount() {
      let accounts = null;

      try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch((err) => {
            if (err.code === 4001) {
              console.error('Please connect to MetaMask.');
            } else {
              console.error(err);
            }
          });
      } catch (err) {
        setMetamaskConnectionError('Failed to request Metamask accounts.');
        console.error(err);
      }

      if (!accounts || typeof accounts[0] !== 'string') {
        setMetamaskConnectionError('Could not get a Metamask account address.');
      } else {
        const account = accounts[0];
        setMetamaskAccountAddress(account);

        setIsMetamaskConnected(true);
      }

      setIsLoading(false);
    }

    async function tryToSendTrx(accountFrom, accountTo, amountToSend) {
      ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
                    // The user's active address.
                    from: accountFrom,
                    // Required except during contract publications.
                    to: accountTo, // recipient address
                    // Only required to send ether to the recipient from the initiating external account.
                    value: amountToSend, // value in wei to send
                    // Customizable by the user during MetaMask confirmation.
                    gasLimit: '0x5028',
                    // Customizable by the user during MetaMask confirmation.
                    maxPriorityFeePerGas: '0x3b9aca00',
                    // Customizable by the user during MetaMask confirmation.
                    maxFeePerGas: '0x2540be400',
            }
          ],
        })
        .then((txHash) => {
          setTransactionHash(txHash);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);

          if (error && typeof error.message === 'string' && error.message.length) {
            setTransactionError(`Transaction did not go through. ${error.message}`);
          } else {
            setTransactionError('Transaction did not go through - see JS console for details.');
          }

          setIsLoading(false);
        });
    }

    // Expose to template.
    return {
      recipientAddress,
      setRecipientAddress,

      amountWeiToSend,
      setAmountWeiToSend,

      metamaskAccountAddress,
      setMetamaskAccountAddress,

      isMetamaskSupported,
      setIsMetamaskSupported,

      isMetamaskConnected,
      setIsMetamaskConnected,

      metamaskConnectionError,
      setMetamaskConnectionError,

      isLoading,
      setIsLoading,

      pleaseInstallMetamask,
      setPleaseInstallMetamask,

      multipleWalletsDetected,
      setMultipleWalletsDetected,

      transactionError,
      setTransactionError,

      transactionHash,
      setTransactionHash,

      detectEP,
      getAccount,
      tryToSendTrx
    };
  },
  async mounted() {
    const provider = await this.detectEP();

    if (!provider) {
      this.setPleaseInstallMetamask(true);
    } else if (provider !== window.ethereum) {
      this.setMultipleWalletsDetected(true);
    } else {
      this.setIsMetamaskSupported(true);
    }

    this.setIsLoading(false);
  },
  components: {
    SpinnerComponent
  },
  template: `
    <div>
      <SpinnerComponent v-if="isLoading" />
      <div v-if="!isLoading">
        <p v-if="pleaseInstallMetamask">
          Please install Metamask.
          You can do so <a href="https://metamask.io/download/">here</a>.
        </p>
        <p v-if="multipleWalletsDetected">
          Do you have multiple wallets installed?
          Please un-install everything, except Metamask.
        </p>
        <p v-if="isMetamaskSupported && !isMetamaskConnected">
          <button v-on:click="metamaskLogin" class="fancyBtn">Metamask login</button>
        </p>
        <p v-if="isMetamaskSupported && isMetamaskConnected">
          Metamask connected. Account address: {{ metamaskAccountAddress }}
        </p>
        <p v-if="isMetamaskSupported && isMetamaskConnected">
          <label for="recipientAddressInput">Recipient address:</label>
          <input
            name="recipientAddressInput"
            :value="recipientAddress"
            @input="onRecipientInputCh"
          />

          <label for="amountInput">Amount to send (in Wei):</label>
          <input
            name="amountInput"
            :value="amountWeiToSend"
            @input="onAmountInputCh"
          />

          <button v-on:click="sendTrx" class="fancyBtn">Send some money</button>
        </p>
        <p v-if="typeof transactionHash === 'string' && transactionHash.length > 0">
          Transaction hash is &ldquo;{{ transactionHash }}&rdquo;.
          See on Etherscan <a v-bind:href="'https://sepolia.etherscan.io/tx/' + transactionHash">here</a>.
        </p>
        <p v-if="typeof metamaskConnectionError === 'string' && metamaskConnectionError.length > 0">
          {{ metamaskConnectionError }}
        </p>
        <p v-if="typeof transactionError === 'string' && transactionError.length > 0">
          {{ transactionError }}
        </p>
      </div>
    </div>
  `
};

export {
  MetamaskComponent
};
