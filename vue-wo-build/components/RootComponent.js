const { TitleComponent } = await import('./TitleComponent.js');

const RootComponent = {
  data: () => ({
    message: "Hello world",
    value: 0,
    showDuck: false
  }),
  methods: {
    incVal() {
      this.value += 1;
    },
    toggleImg() {
      if (this.showDuck) {
        this.showDuck = false;
      } else {
        this.showDuck = true;
      }
    }
  },
  components: {
    TitleComponent
  },
  template: `
    <TitleComponent />
    <p>I am a template with some fancy Vue powers!</p>
    <br />
    <p>First - {{message}}</p>
    <p>Second - try pressing the button <button v-on:click="incVal" class="fancyBtn">+1</button>&nbsp;{{ value }}</p>
    <br />
    <p>Do you want to see an image below?</p>
    <p><button v-on:click="toggleImg" class="fancyBtn">toggle image</button></p>
    <img v-if="showDuck" src="./img/duck.png" class="duck" />
  `
};

export {
  RootComponent
};
