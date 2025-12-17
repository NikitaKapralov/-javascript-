function hello() {
  console.log('Skill');
}
try { 
  helo();
} catch (error) {
  console.error('Произошла ошибка:', error.message);
}
console.log('complete');