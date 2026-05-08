"use client";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      ctx = new AudioContext();
    }
    // 移动端自动播放策略：用户手势后恢复
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  } catch {
    return null;
  }
}

/**
 * 撕纸声：白噪音爆发 + 带通滤波 + 快速衰减
 * 模拟纸张撕裂的沙沙质感
 */
export function soundTear() {
  const ac = getCtx();
  if (!ac) return;

  const duration = 0.18;
  const bufferSize = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ac.createBufferSource();
  source.buffer = buffer;

  // 带通滤波，留下 2k-5kHz 的纸质感频段
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3200;
  filter.Q.value = 0.7;

  const gain = ac.createGain();
  const now = ac.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.5, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  source.start(now);
  source.stop(now + duration + 0.01);
}

/**
 * 贴纸声：低频短促闷击 + 细微点击瞬态
 * 模拟贴纸落在表面的"噗"声
 */
export function soundStick() {
  const ac = getCtx();
  if (!ac) return;

  const now = ac.currentTime;

  // 主体：低频正弦衰减（闷击感）
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(55, now + 0.09);

  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.48, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

  osc.connect(oscGain);
  oscGain.connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.12);

  // 瞬态：极短噪音点击（增加真实感）
  const clickLen = Math.floor(ac.sampleRate * 0.007);
  const clickBuf = ac.createBuffer(1, clickLen, ac.sampleRate);
  const cd = clickBuf.getChannelData(0);
  for (let i = 0; i < clickLen; i++) {
    cd[i] = (Math.random() * 2 - 1) * (1 - i / clickLen);
  }
  const click = ac.createBufferSource();
  click.buffer = clickBuf;

  const clickGain = ac.createGain();
  clickGain.gain.setValueAtTime(0.28, now);

  click.connect(clickGain);
  clickGain.connect(ac.destination);
  click.start(now);
}
