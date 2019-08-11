# Climb On

Climb on is an app for tracking climbing training sessions. **This app is not currently being worked on. I may continue with it again. In the meantime, I've written up a summary of the project under the "postmortem section.**

<img src="https://raw.githubusercontent.com/GraysonRicketts/Climbing-Training-App/master/readme-pictures/home-screen.png" width="50%" />
<img src="https://raw.githubusercontent.com/GraysonRicketts/Climbing-Training-App/master/readme-pictures/session-page.png" width="50%" />
<img src="https://raw.githubusercontent.com/GraysonRicketts/Climbing-Training-App/master/readme-pictures/session-page-2.png" width="50%" />
<img src="https://raw.githubusercontent.com/GraysonRicketts/Climbing-Training-App/master/readme-pictures/previous.png" width="50% />
<img src="https://raw.githubusercontent.com/GraysonRicketts/Climbing-Training-App/master/readme-pictures/statistics.png" width="50%" />

## Postmortem
After taking a break from this project I no longer was interested in continuing. However, it was a fun learning experience and I like to document what went well, why I stopped, what didn't go well, and what I'm going to take into the next project.

### What went well
I made an iOS app and got it to the point where it was in closed beta at my climbing gym. It was awesome to see people around me using my app and giving me feedback on it. In addition, I had never used React Native before so it was fantastic to get so far on my first project in a new technology.

The code was clean and I made regular progression. At the time I was working on this I was also reading *Code Complete* and it was very fulfilling to apply what I was reading to a project so I could burn the lessons into my mind. Specifically, the mantra "reduce complexity" was deeply engrained in my thought process as I was building this out. Ultimately this lead to a very nice progression of the app.

### Why I stopped
I started a mew job at the beginning of June 2019 (you might notice the last commit was May 29th). I wanted to fully dedicate myself to getting up to speed on the new team and adjust to living in a new city, so I had a lot of other things in my life that were higher priority than this personal project. Also, as I'll discuss in the next section, I think the problem being solved -- climbing skill not progressing -- by this app shifted slightly.

### What didn't go well
I got tied up in getting code to look pretty. Specifically, I spent more time than I'd like to remember or admit on getting linters to work nice. The goal was to make things easier to read and collaborate. The problem was it takes a long time and opens a pandoras box of "ooo, got to fix that" but fixing that adds no value to the product.

The solution to "how do I get better was undefined." Initially it was I'll get better by recording my climbs but when I got to the statistics page portion I had no idea what information I could pull out of my data to solve that question. It was a good learning experience and I have a number of ideas now (V-sum, V-density, duration, redpoint count, etc.), so this will be the first part I touch if I come back to this project.

This is an app on your phone. If you go to the climbing gym do you use your phone like you would Strong if you were in a classic weightlifting gym. For 99% of people the answer is "no." Most people are social climbers who want to get better, so whipping out your phone every time you get off the wall suuuuucks. I need to think about the best way to allow adding (maybe website instead so you can just take a book with your or log details afterwards. Idk, still figuring it out) and **I need to think about how this app is used in the context of the real world.** Granted, I knew this might be a problem when I started so kudos to me for realizing it might be a potential issue.

### What I'm taking into next project
- I'm just going to use Prettier, from the start, and call it good enough.
- I'll probably just use native application since it's optimized and easier to collaborate on than a cross language compile application such as react native.
- I'll make sure I have a deep understanding of domain and breadth of alternatives. I should have a read a book or two more about climbing training or had a successful training experience myself before diving in (maybe, this is the point I'm most hesitant about. I sort of like that I went with it and it didn't get bogged down in "well I need to know more before I start" because that opens up the possibility of never starting and that possibility is the worst 🙃)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* React
* React-native
* npm

### Installing

```bash
git checkout https://github.com/GraysonRicketts/Climbing-Training-App.git
cd react-native
npm install
react-native run-ios --no-packager
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://www.gnu.org/licenses/gpl-3.0.en.html)
