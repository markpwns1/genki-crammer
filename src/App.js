// https://www.csus.edu/indiv/s/sheaa/projects/genki/vocab_main.html

import logo from './logo.svg';
import './App.css';
import { load } from 'cheerio';
import { Component } from "react";

const hepburn = require("hepburn");

const CROSS_ORIGIN_HACK = "https://cors-anywhere.herokuapp.com/";
const SCRAP_URL = "ohelo.org/japn/lang/genki_vocab_table.php?lesson=";
const JISHO_SEARCH = "https://jisho.org/search?keyword=";

const LESSONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const lessonContents = {

};

export default class App extends Component {

  state = { 
    lessonNumber: 1,
    vocabItems: [ ],
    currentQueue: [ ],
    vocabIndex: 0,
    revealDetails: false,
    currentWord: null,
    hasFailed: false,
    showRomaji: false
  }

  componentDidMount() {
    this.updateState = this.updateState.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onLessonChange = this.onLessonChange.bind(this);
    this.setLesson = this.setLesson.bind(this);
    this.onRomajiChecked = this.onRomajiChecked.bind(this);
    this.removeKanaFromQueue = this.removeKanaFromQueue.bind(this);
    this.onKanjiClicked = this.onKanjiClicked.bind(this);

    this.setLesson();
  }

  shuffleArray(array) {
    let a = [ ...array ];
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a
  }

  setLesson() {

    this.updateState({
      vocabItems: [ ],
      currentWord: null
    });

    fetch(CROSS_ORIGIN_HACK + (SCRAP_URL + this.state.lessonNumber))
    .then(x => x.text())
    .then(x => {
      let vocabItems = [ ];
      const $ = load(x);
      const table = $("tbody");
      const rows = table.children();
      const rowCount = rows.length;
      for (let i = 1; i < rowCount; i++) {
        const row = rows.eq(i);
        let vocab;
        if(row.children().length == 3) {
          vocab = {
            kana: row.children().eq(0).text().trim(),
            kanji: row.children().eq(1).text().trim(),
            english: row.children().eq(2).text().split(/,|;|\//).map(x => x.trim()),
          };
        }
        else {
          vocab = {
            kana: row.children().eq(0).text().trim(),
            kanji: row.children().eq(1).text().trim(),
            romaji: row.children().eq(2).text().split(/,|;|\//).map(x => x.trim().toLowerCase()),
            english: row.children().eq(3).text().split(/,|;|\//).map(x => x.trim()),
          };
        }
        
        // vocab.romaji = vocab.kana.split("／").map(x => hepburn.fromKana(x).trim().toLowerCase()
        //   .replace(/ō/gi, "ou")
        //   .replace(/ā/gi, "aa")
        //   .replace(/ē/gi, "ei")
        //   .replace(/ū/gi, "uu")
        //   .replace(/ī/gi, "ii"));

        vocab.romaji = vocab.kana.split("／").map(x => hepburn.fromKana(x).trim().toLowerCase()
          .replace(/ō/gi, "ou")
          .replace(/ā/gi, "aa")
          .replace(/ē/gi, "ei")
          .replace(/ū/gi, "uu")
          .replace(/ī/gi, "ii"));

        vocabItems.push(vocab);
      }

      this.updateState({
        currentQueue: this.shuffleArray(vocabItems),
        vocabItems: vocabItems,
        vocabIndex: this.random(vocabItems.length),
        revealDetails: false
      }, () => {
        this.updateState({
          currentWord: this.state.currentQueue.pop()
        });
      });
    });
  }

  random(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  updateState(newStates, callback) {
    const s = {
      ...this.state,
      ...newStates
    };

    this.setState(s, callback);
  }

  strip(w) {
    return w
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-z]/gi, '')
    .replace(/ee/gi, "ei")
    .replace(/oo/gi, "ou")
  }

  onKeyDown(e) {
    // console.log(e);
    // "hui".repl
    if(e.key === "Enter") {
      if(this.state.currentWord.romaji.map(x => this.strip(x))
        .includes(this.strip(e.target.value))) {

        if(this.state.hasFailed)
          this.state.currentQueue.unshift(this.state.currentWord);

        if(this.state.currentQueue.length == 0) {
          this.updateState({
            lessonNumber: (this.state.lessonNumber + 1)
          }, () => {
            this.setLesson();
          });
        }
        else {
          this.updateState({
            currentWord: this.state.currentQueue.pop(),
            revealDetails: false,
            hasFailed: false
          });
        }
        
      }
      else {
        this.updateState({
          revealDetails: true,
          hasFailed: true
        });
      }
      e.target.value = "";
    }
  }

  onLessonChange(e) {
    this.updateState({
      lessonNumber: e.target.value
    }, () => {
      this.setLesson();
    });
  }

  onRomajiChecked() {
    this.updateState({
      showRomaji: !this.state.showRomaji
    });
  }

  removeKanaFromQueue() {
    this.updateState({
      currentQueue: this.state.currentQueue.filter(x => x.kanji.trim() != "")
    });
  }

  onKanjiClicked(kanjiText) {
    if(this.state.revealDetails) {
      window.open(JISHO_SEARCH + kanjiText);
    }

    this.updateState({
      revealDetails: true,
      hasFailed: true
    });
  }

  render() {
    const vocab = this.state.currentWord;
    if(!vocab) return <div className="app centered">
      Fetching vocabulary... This may take a while.
    </div>;

    const kanjiText = vocab.kanji == ""? vocab.kana : vocab.kanji;

    return (
      <div className="app">
        <div className="centered">
          <select className="lesson-select" onChange={e => this.onLessonChange(e)} value={this.state.lessonNumber}>
            {LESSONS.map(x => {
              return <option key={x} value={x}>Lesson {x}</option>
            })}
          </select>
          &nbsp;&nbsp;
          <input type="button" value="Kanji Only" onClick={() => this.removeKanaFromQueue()}></input>
          <br></br>
          <input type="checkbox" name="romaji" checked={this.state.showRomaji} onChange={e => this.onRomajiChecked(e)}></input>
          <label for="romaji"> Show Romaji Pronounciations</label>
          <hr></hr>
        </div>
        <div className="the-app centered">
            <p>{1 + this.state.currentQueue.length} Left</p>
            <h1 className="centered kanji">
              <a href="#" onClick={() => this.onKanjiClicked(kanjiText)}>
                {kanjiText}
              </a>
            </h1>
            {this.state.revealDetails? <div>
              {(vocab.kanji != "" || this.state.showRomaji)? <p className="help-text">pronounciation</p> : undefined}
              {vocab.kanji == ""? 
              (this.state.showRomaji? <h2 className="pronounciation">{vocab.romaji.join(", ")}</h2> : undefined) : 
              <h2 className="pronounciation">{vocab.kana}<br></br>{this.state.showRomaji? vocab.romaji.join(", ") : undefined}</h2>}
              <p className="help-text">meaning</p>
              <h2 className="english">{vocab.english.join(", ")}</h2>
            </div> : undefined }
        </div>
        <div className="centered">
          <p className="help-text">Enter the romaji that corresponds to this word</p>
          <input className="main-textbox" type="text" onKeyDown={e => this.onKeyDown(e)}></input>
        </div>
      </div>
    );
  }
}
