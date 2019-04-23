void setup() {
    Serial.begin(9600);
  pinMode(9, INPUT_PULLUP);
  pinMode(7, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
}

void loop() {
  //Serial.println(digitalRead(9));

  if(digitalRead(9) == LOW){ // finger 1
    Serial.print('1'); // finger is down
  }
  else{
    Serial.print('0'); // finger is up
  }
 Serial.print(':');
  if(digitalRead(7) == LOW){ // finger 2
    Serial.print('1'); // finger is down
 }
  else{ 
    Serial.print('0'); // finger is up
  }
  Serial.print(':');  
  if(digitalRead(5) == LOW){ // finger 3
    Serial.print('1'); // finger is down
  }
  else{
    Serial.print('0'); // finger is up
  }
  Serial.print(':');  
  if(digitalRead(3) == LOW){ // finger 4
    Serial.print('1'); // finger is down 
  }
  else{
    Serial.print('0'); // finger is up 
  }
  Serial.println('-');
}
