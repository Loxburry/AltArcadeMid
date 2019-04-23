void setup() {
  pinMode(9, INPUT_PULLUP);
  pinMode(7, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  //Serial.println(digitalRead(9));

  if(digitalRead(9) == HIGH){ // finger 1
    Serial.print('1'); // on
  }
  else{ // finger 2
    Serial.print('0'); // off
  }
  Serial.print(':');
  if(digitalRead(7) == HIGH){ // finger 2
    Serial.print('1'); // on
  }
  else{ 
    Serial.print('0'); // off
  }
  Serial.print(':');  
  if(digitalRead(5) == HIGH){ // finger 3
    Serial.print('1'); // on
  }
  else{
    Serial.print('0'); // off
  }
  Serial.print(':');  
  if(digitalRead(3) == HIGH){ // finger 4
    Serial.print('1'); // on 
  }
  else{
    Serial.print('0'); // off 
  }
  Serial.print('-');
}
