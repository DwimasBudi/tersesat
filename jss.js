let play = function(){document.getElementById("audio").play()}

// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
var textArray = [
  "Demikianlah Perempuan|I LOVE YOU", 
  "Ia hanya ingat kekejaman orang kepada dirinya walaupun kecil|I LOVE YOU", 
  " Dan ia lupa kekejamannya sendiri pada orang lain Padahal begitu besarnya|I LOVE YOU",
  "Lupakah kau siapa diantara kita yang kejam|He kept getting lost a C",
  " ketika itu kau antarkan saya di simpang jalan, kau berjanji akan menunggu kedatanganku berapapun lamanya|I LOVE YOU",
  "tapi kemudian kau berpaling ke yang lebih gagah kaya raya, berbangsa, beradat , berlembaga, berketurunan|I LOVE YOU",
  "kau kawin dengan dia, Kau sendiri yang bilang padaku bahwa pernikahan itu bukan terpaksa oleh paksaan orang lain tetapi pilihan hati kau sendiri|I LOVE YOU",
  "Hampir saya mati menanggung cinta Hayati|I LOVE YOU",
  "Dua bulan lamanya saya tergeletak di tempat tidur, kau jenguk saya dalam sakitku|I LOVE YOU",
  "menunjukkan bahwa tangan kau telah berinang, bahwa kau telah jadi kepunyaan orang lain.|I LOVE YOU", 
  "Siapakah di antara kita yang kejam Hayati?|I LOVE YOU",
  "Saya kirimkan surat-surat, meratap, menghinakan diri, memohon dikasihani|I LOVE YOU",
  "Tiba-tiba kau balas surat itu, dengan suatu balasan yang tak tersudu di itik, tak termakan di ayam|I LOVE YOU",
  "Kau katakan bahwa, kau miskin saya pun miskin, Hidup tak kan beruntung kalau tidak dengan uang|I LOVE YOU",
  "Karna itu kau pilih kehidupan yang lebih senang, mentereng, cukup uang, berenang di dalam emas, bersayap uang kertas.|I LOVE YOU",
  "Siapakah di antara kita yang kejam Hayati?|I LOVE YOU",
  "Saya tidak kejam, saya hanya menuruti katamu hayati|I LOVE YOU",
  "Supaya cinta kita dihilangkan dan dilupakan saja|I LOVE YOU",
  "Diganti dengan persahabatan yang kekal|I LOVE YOU",
  "Permintaan itulah yang saya pegang teguh sekarang|I LOVE YOU",
  "Permintaan itulah yang saya pegang teguh sekarang.|I LOVE YOU",
  "KAU BUKAN KECINTAANKU, BUKAN TUNANGANKU, BUKAN ISTRIKU|I LOVE YOU",
  "Tetapi janda dari orang lain.|I LOVE YOU",
  "Maka itu secara seorang sahabat, bahkan secara seorang saudara|I LOVE YOU",
  "saya akan kembali teguh memegang janjiku dalam persahabatan itu sebagaimana teguhku dahulu memegang cintaku.|I LOVE YOU",
  "~~Zainuddin~~|I LOVE YOU"
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 1000, //Wait between first and second lines
    speedBackspace = 25; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), //Header element
      eParagraph = element.children("p"); //Subheader element
  
  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
        
      // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
      
    // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
      
    }
    
  // If backspacing is enabled
  } else {
    
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
    
    // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else { 
      
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function(){ typeWriter(id, ar); }, 50);
      
    }
  }
}