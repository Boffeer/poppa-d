# Poppa D

The easiest way to create popups

## Usage

### 1. Create a button

Create `<a>` tag with class `poppa__button` and href with class or id of your popup block.

```html
<a href="#my-pop" class="poppa__button">toggle pop</a>
```

You can create as much as you need buttons with similar id and it will work properly

```html
<a href="#my-pop" class="poppa__button">Toggler 1</a>
<a href="#my-pop-2" class="poppa__button">Toggler 2</a>
<a href="#my-pop-3" class="poppa__button">Toggler 3</a>
```

### 2. Create a pop

Create a layout for your popup with `poppa__popup` class and give it `id` or `class` of `.poppa__button` href attribute

```html
<div class="poppa__popup" id="my-pop">
  <p>I'm Poppa the 1st!</p>
</div>
<div class="poppa__popup" id="my-pop-2">
  <p>I'm Poppa the 2nd!</p>
</div>
<div class="poppa__popup" id="my-pop-3">
  <p>I'm Poppa 3rd!</p>
</div>
```

### 3. Init Poppa

And insert in js this:

```js
const popups = new Poppa();
```

### 4. You awesome!

Your popups are ready!

## Functions

You can call the functions of `Poppa()`

For example, you wanna

1. open popup with id="open-me"
2. close with class="close-me"

You already have this object

```js
const popups = new Poppa();
```

Just call method:

```js
const openMePop = document.querySelector("#open-me");
const closeMePop = ".close-me";

popups.openPop(openMePop);
popups.closePop(".close-me");
```

## Events

Your popups, wich created by Poppa dispatch custom events.
You can add it very native:

```js
document.querySelector(".my-pop").addEventListener("poppa-opened", () => {
  console.log(".my-pop is opened!");
});
```

| element | event name   |
| ------- | ------------ |
| popup   | poppa-opened |
| popup   | poppa-closed |

## Extra features

You can close popup on ESC or click outside popup

### Very long popups

If your popup height bigger than screen, popup will be scrollable

If there is a hash in your link, the popup with hash id will opened by default
