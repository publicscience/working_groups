/*

Sound Synthesis in SuperCollider: Subtractive and Additive Synthesis

http://www.sussex.ac.uk/Users/nc81/modules/cm1/scfiles/2.1 Subtractive and Additive Synthesis.html

*/
FreqScope.new

//subtractive synthesis
{WhiteNoise.ar(0.1)}.scope

{LPF.ar(WhiteNoise.ar(0.1), Line.kr(10000, 1000, 10))}.scope

{Resonz.ar(LFNoise0.ar(400), 1000, 0.1)}.scope

{Resonz.ar(LFNoise0.ar(400), Line.kr(10000, 1000, 10), 0.1)}.scope

(
{
var source, line, filter; // local variables

	source = LFNoise0.ar(400);
	line = Line.kr(10000, 1000, 10);
	filter = Resonz.ar(source, line, 0.1);

	filter //return the filter
}.scope;

)


//additive synthesis

{SinOsc.ar}.scope // defaults to 440hz

{SinOsc.ar(400, 0, 0.1) + SinOsc.ar(660, 0, 0.1)}.scope
//or
{SinOsc.ar([400, 660], 0, 0.1)}.scope

//panning ugen

{Pan2.ar(WhiteNoise.ar(0.1), MouseX.kr(-1, 1))}.scope // pan from left to right using mouse

//multi channel audio can be achieved by using an array

{SinOsc.ar([400, 435, 234], 0, 0.1)}.scope

//mix ugen, takes multichannel audio and mixes it down into a mono or stereo signal

{Mix(SinOsc.ar([440, 523, 880], 0, 0.1))}.scope

//we can then pan that mono signal into a stereo field

{Pan2.ar(Mix(SinOsc.ar([440, 523, 880], 0, 0.1)), MouseX.kr(-1, 1))}.scope

//now we can make some basic waves

//sawtooth wave: add up n harmonics with amplitude falling off as 1/harmonic number, sign alternates between -1 and 1

(
{
	var n = 10;
	var wave = Mix.fill(10, {|i|
		var mult = ((-1)**i)*(0.5/((i+1)));
		SinOsc.ar(440*(i+1))*mult
	});
	Pan2.ar(wave/n, 0.0); //stereo, panned center
}.scope
)


//square wave: sum of odd harmonics, no even, amplitude falls off as 1/harmonic number, cloest 'real' waveform is clarinet

(
{
	var n = 10;

	var wave = Mix.fill(10, {|i|
		var harmonicnumber = 2*i+1; //odd harmonics only
		SinOsc.ar(440*harmonicnumber)/harmonicnumber
	})*0.25;

	Pan2.ar(wave, 0.0);
}.scope
)


//triangle wave: odd harmonicsonly, falls off as 1/harmonic number squared, with alternating sign

(
{
	var n = 10;
	var wave = Mix.fill(10, {|i|
		var harmonicnumber = 2*i+1;//odd harmonics only

		var mult = ((-1)**((harmonicnumber-1)/2))*(1.0/(harmonicnumber*harmonicnumber));

		SinOsc.ar(880*i)*mult})/n;

	Pan2.ar(wave, 0.0); // stereo, panned center
}.scope
)

/*

Bell sound example

This frequency arrangement:

500*[0.5,1,1.19,1.56,2,2.51,2.66,3.01,4.1]

*/

500*[0.5,1,1.19,1.56,2,2.51,2.66,3.01,4.1]

{Mix(SinOsc.ar(500*[0.5,1,1.19,1.56,2,2.51,2.66,3.01,4.1], 0, 0.1))}.scope

//we can also give each partial its own amplitude (volume)

{Mix(SinOsc.ar(500*[0.5,1,1.19,1.56,2,2.51,2.66,3.01,4.1],0,0.1*[0.25,1,0.8,0.5,0.9,0.4,0.3,0.6,0.1]))}.scope

//generalizable patch that uses a var for the number of tones

(
var n = 5;

{Mix(SinOsc.ar(250*(1..n), 0, 1/n))}.scope;

)


((1..10)) // returns an array of numbers from 1 to 10