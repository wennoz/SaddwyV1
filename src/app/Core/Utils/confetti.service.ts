import { Injectable } from '@angular/core';
import confetti from 'confetti-js';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  constructor() { }

  startConfetti() {
    confetti();
  }
}
