document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.querySelector(".typing-text p");
  const input = document.querySelector(".wrapper .input-field");
  const time = document.querySelector(".time span b");
  const mistakes = document.querySelector(".mistake span");
  const wpm = document.querySelector(".wpm span");
  const cpm = document.querySelector(".cpm span");
  const btn = document.querySelector("button");
  btn.disabled = true;
  btn.classList.add("disabled");

  document.addEventListener("keydown", () => {
    input.focus();
  });
  typingText.addEventListener("click", () => {
    input.focus();
  });

  // * set values
  let timer;
  let maxTime = 60;
  let timeLeft = maxTime;
  let charIndex = 0;
  let mistake = 0;
  let isTyping = false;

  function loadParagraph() {
    const paragraphs = [
      "The sky turned shades of orange and pink as the sun dipped below the horizon. Children played in the fading light while laughter echoed through the streets, filling the air with joy and warmth.",
      "The bookstore smelled of old pages and coffee. Each shelf was a treasure trove of stories waiting to be discovered. She ran her fingers along the spines, searching for the next adventure to begin.",
      "Thunder rumbled in the distance as rain started to fall. The streets quickly emptied, but she stood under the awning, watching droplets dance on the pavement, lost in thoughts she hadn’t visited in years.",
      "Snowflakes drifted lazily from the sky, covering everything in a blanket of white. The town felt silent and magical, like a dream. Children built snowmen while adults sipped cocoa by roaring fires indoors.",
      "Leaves crunched beneath his boots as he walked through the forest. The scent of pine and earth filled his senses. Birds sang softly, and the gentle rhythm of nature soothed his restless soul.",
      "The old lighthouse stood tall against the crashing waves. Its light swept the sea, a beacon for wandering ships. Inside, dust covered everything, but the spirit of the sea keeper still lingered silently.",
      "He opened the letter again, reading the words over and over. Though faded, the emotions remained strong. It was a goodbye he never expected and a memory he couldn’t seem to let go.",
      "In the heart of the city, music played from open windows. People danced in the streets, hands joined, hearts open. The celebration was spontaneous, sparked by joy, community, and the beauty of being alive.",
      "The desert stretched endlessly under the scorching sun. Heat waves danced above the sand, and not a soul was in sight. Still, she felt a strange sense of calm, like the earth was listening.",
      "A dog barked in the distance, breaking the afternoon silence. The park was nearly empty, save for an elderly man feeding pigeons and a girl sketching trees with a pencil and a curious mind.",
      "He watched the fireflies flicker in the twilight, mesmerized by their dance. Each light was a tiny miracle in the dark, reminding him that even the smallest spark can shine brilliantly in shadow.",
      "She closed her journal and looked out the window. Raindrops traced paths on the glass, mimicking her thoughts—wandering, unpredictable, and beautiful in their own chaotic rhythm through life’s many uncertainties.",
      "The cafe buzzed with quiet conversations and the clink of coffee cups. Steam rose from mugs, and pages turned in worn books. It was a haven for those seeking comfort in simple moments.",
      "The attic was filled with forgotten things—photographs, letters, toys from another era. She knelt beside an old trunk, lifting the lid and releasing memories that smelled of mothballs and faded summer afternoons.",
      "Beneath the waves, a coral reef pulsed with life. Fish darted between colors that seemed painted by magic. The diver hovered in awe, weightless, as if floating through an underwater dreamscape.",
      "The campfire crackled as stories were told beneath star-strewn skies. Marshmallows toasted to golden perfection, and every tale sparked laughter, fear, or wonder. The woods listened, their secrets safe in the night.",
      "Morning light spilled through the curtains, gentle and golden. She stretched, savoring the stillness before the world woke. It was a sacred time, filled with potential and the promise of a new day.",
      "The train platform buzzed with anticipation. Suitcases rolled, announcements echoed, and strangers shared glances. He clutched his ticket tightly, heart pounding with the thrill of leaving and the hope of starting fresh.",
      "Clouds gathered ominously over the mountain ridge. Hikers quickened their pace, but he paused, soaking in the moment. The wind howled, and the storm brewed, yet he felt inexplicably alive and unafraid.",
      "Balloons drifted into the sky, carried by giggles and sticky fingers. A child’s birthday party unfolded in chaotic joy—games, cake, and the kind of laughter that only comes from unfiltered, boundless happiness.",
      "The art gallery was silent, save for the soft click of heels on the marble floor. She stopped before a painting, drawn in by its colors. It felt like the artist knew her.",
      "The beach bonfire lit their faces as they sang old songs. Flames danced in rhythm to the music, and the stars above blinked in approval. It was a night they’d remember forever.",
      "A forgotten garden bloomed again after the rains. Vines crept over stone walls, and petals opened to the sun. Bees returned, and life resumed its quiet magic, like it had been waiting all along.",
      "Lanterns floated down the river, each carrying a wish. They bobbed gently on the current, glowing softly. Some carried sorrow, others hope, but all were drifting toward the same mysterious destination.",
      "The playground echoed with the sounds of childhood. Swings creaked, slides whooshed, and laughter rang out. Parents watched from benches, some smiling, others lost in memories of their own distant youth.",
      "Books towered around her like walls in a fortress of words. She’d built this haven over years, one page at a time. In their stories, she’d found solace, strength, and the meaning of home.",
      "The festival lights blinked across the night sky, reflecting in the river’s dark waters. Music pulsed from every corner, and people danced, unafraid, celebrating life with each heartbeat, footstep, and glowing smile.",
      "The windmill’s blades turned slowly in the breeze. It stood like a sentinel on the hill, watching over fields of golden grain. Its creak was a lullaby to those who lived nearby.",
      "He waited at the airport gate, flowers in hand, nerves fluttering in his chest. Passengers disembarked one by one until her smile broke through the crowd, and time slowed to a heartbeat.",
      "The museum halls whispered history. Armor glinted under dim lights, and ancient scrolls lay sealed behind glass. Children stared wide-eyed, sensing that these dusty relics once shaped the world they now knew.",
      "The library’s silence was soothing, broken only by turning pages and soft footsteps. Sunlight slanted through high windows, painting light on dusty shelves. It was a sanctuary where ideas breathed and grew.",
      "The violinist played beneath the archway, notes echoing through the stone corridor. Passersby slowed, drawn by the melancholy tune. For a few moments, the music stitched strangers’ hearts together in silent unity.",
      "A carnival rolled into town overnight. When morning came, tents stood tall, rides spun wildly, and the scent of cotton candy filled the air. It felt like magic had arrived in disguise.",
      "Her hands moved gracefully across the piano keys, filling the room with melody. Each note carried emotion, telling a story without words. Outside, people paused to listen through the open window.",
      "On the rooftop, the city spread beneath them like a glittering blanket. They lay side by side, pointing out constellations and sharing dreams. The night held them close, wrapped in possibilities.",
      "The bakery opened before dawn. Warm bread filled the air with comfort as sleepy customers shuffled in. Each loaf was a little piece of love, handmade and fresh with the promise of home.",
      "Beneath the bridge, the river gurgled softly, reflecting city lights. Lovers carved initials into its wooden railings, promises etched in time. Some were long gone, but their stories lingered in the current.",
      "The school bell rang, and footsteps thundered down the hallway. Backpacks bounced, and voices rose in chatter. A new day of learning began, filled with questions, answers, and endless youthful energy.",
      "He wrote poetry on napkins in a corner café. Most people didn’t notice, but the waitress always smiled when she cleared his table, pocketing the verses like secret treasures left behind.",
      "Wind rustled the pages of her notebook as she sat beneath the old oak tree. Words spilled out effortlessly, like the tree itself whispered inspiration through every leaf, breeze, and birdsong.",
      "The city awoke with honking horns and hurried footsteps. Vendors opened their stalls, and the scent of breakfast filled alleyways. It was chaos, but also beautiful—a symphony of routine and life.",
      "A squirrel darted across the power line, balancing like a tightrope artist. Below, cars moved obliviously. Nature’s performers played unnoticed acts, reminding the world that life thrived in every little corner.",
      "The mountain cabin smelled of pine and old books. A fire crackled, and mugs of cocoa steamed nearby. Silence wasn’t empty here—it was full of peace, thought, and a slower rhythm.",
      "She twirled in her new dress, giggling in front of the mirror. The fabric fluttered like butterfly wings. It wasn’t just a dress—it was confidence, joy, and the magic of feeling seen.",
      "The storm passed, leaving puddles on the ground and a rainbow overhead. Children splashed with glee, while grownups paused to watch. Nature’s fury always made its peace offering in color and calm.",
      "The garden buzzed with life. Bees danced among sunflowers, butterflies flitted near lavender. It was wild yet gentle—a place where every bloom had its moment in the sun, however brief or bold.",
      "Fireworks painted the night sky in bursts of red, green, and gold. Cheers rose with each explosion. For those few moments, time paused and the world stood in awe of light and sound.",
      "The painter stood before her canvas, brush hovering mid-air. Colors waited on the palette, impatient. Each stroke would bring an idea to life, capturing emotions words could never quite express the same way.",
      "Fog rolled over the hillside like a creeping wave. Trees disappeared into the mist, becoming ghostly silhouettes. There was something calming about the quiet—the way fog muffled the world and made it whisper.",
    ];

    const randomIndex = Math.floor(Math.random() * paragraphs.length);

    typingText.innerHTML = "";
    for (const char of paragraphs[randomIndex]) {
      typingText.innerHTML += `<span>${char}</span>`;
    }

    typingText.querySelectorAll("span")[0].classList.add("active");

    input.value = "";
    charIndex = 0;
    mistake = 0;
    timeLeft = maxTime;
    isTyping = false;
    time.innerText = timeLeft;
    mistakes.innerText = mistake;
    wpm.innerText = 0;
    cpm.innerText = 0;
    btn.disabled = true;
    btn.classList.add("disabled");
  }

  loadParagraph();

  // * Handle Inputs
  function initTyping() {
    const char = typingText.querySelectorAll("span");
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
      if (!isTyping) {
        isTyping = true;
        timer = setInterval(initTime, 1000);
      }
      if (char[charIndex].innerText === typedChar) {
        char[charIndex].classList.add("correct");
        console.log("correct");
      } else {
        char[charIndex].classList.add("incorrect");
        console.log("incorrect");
        mistake++;
      }
      charIndex++;
      char[charIndex].classList.add("active");
      mistakes.innerText = mistake;
      cpm.innerText = charIndex - mistake;
    } else {
      clearInterval(timer);
      input.value = "";
      btn.disabled = false;
      btn.classList.remove("disabled");
    }
  }

  function initTime() {
    if (timeLeft > 0) {
      timeLeft--;
      time.innerText = timeLeft;
      const wpmValue = Math.round(
        ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm.innerText = wpmValue;
    } else {
      clearInterval(timer);
    }
  }

  input.addEventListener("input", initTyping);
  btn.addEventListener("click", () => {
    loadParagraph();
    clearInterval(timer);
  });
});
