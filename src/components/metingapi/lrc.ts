
export interface LyricLine {
  text: string
  start: number
  end: number
}

function parseLyricLine(line: string) {
  const timePattern = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/
  const match = timePattern.exec(line) as RegExpExecArray

  if (!match) {
    throw new Error('Invalid lyric line format')
  }

  const min2sec = Number.parseInt(match[1]) * 60
  const sec2sec = Number.parseInt(match[2])
  const msec2sec = match[3] ? Number.parseInt(match[3]) / (match[3].length === 2 ? 100 : 1000) : 0

  return min2sec + sec2sec + msec2sec
}

export class Lyric {
  url: string
  rawContent: string
  lyrics: LyricLine[]
  constructor(url: string) {
    this.url = url
    this.rawContent = ''
    this.lyrics = []
  }

  async fetchLyric() {
    this.rawContent = (await (await fetch(this.url)).text())
  }

  parseLyric() {
    const lines = this.rawContent.split('\n')
    lines.pop()
    for (let i = 0; i < lines.length; i++) {
      const start = parseLyricLine(lines[i])
      const end = i === lines.length - 1 ? Infinity : parseLyricLine(lines[i + 1])
      const text = lines[i].replace(/\[.*\]/, '')
      this.lyrics.push({ text, start, end })
    }
  }
}
