// Tsukuyomi Extreme
[{
  zoneRegex: /^The Minstrel's Ballad: Tsukuyomi's Pain$/,
  timelineFile: 'tsukuyomi-ex.txt',
  triggers: [
    {
      id: 'Tsukuyomi Nightfall Gun',
      regex: / 14:2BBC:Tsukuyomi starts using Nightfall/,
      alertText: {
        en: 'Gun: Stack',
      },
    },
    {
      id: 'Tsukuyomi Nightfall Spear',
      regex: / 14:2BBD:Tsukuyomi starts using Nightfall/,
      alertText: {
        en: 'Spear: Spread',
      },
    },
    {
      id: 'Tsukuyomi Torment',
      regex: / 14:2BBB:Tsukuyomi starts using Torment Unto Death on (\y{Name})/,
      alarmText: function(data, matches) {
        if (matches[1] == data.me || data.role != 'tank')
          return;
        return {
          en: 'Tank Swap!',
        };
      },
      alertText: function(data, matches) {
        if (matches[1] == data.me) {
          return {
            en: 'Tank Buster on YOU',
            de: 'Tenkbasta auf DIR',
          };
        }
        if (data.role == 'healer') {
          return {
            en: 'Buster on ' + data.ShortName(matches[1]),
            de: 'Tenkbasta auf ' + data.ShortName(matches[1]),
          };
        }
      },
      infoText: function(data, matches) {
        if (matches[1] == data.me || data.role == 'tank' || data.role == 'healer')
          return;
        return {
          en: 'Get out of front',
        };
      },
      tts: function(data, matches) {
        if (data.role == 'tank' || data.role == 'healer') {
          return {
            en: 'buster',
            de: 'basta',
          };
        }
      },
    },
    {
      regex: /:Tsukuyomi gains the effect of Full Moon/,
      run: function(data) {
        var moonInOut = {
          en: 'Out',
        };
        data.moonInOut = moonInOut[data.lang] || moonInOut['en'];
      },
    },
    {
      regex: /:Tsukuyomi gains the effect of New Moon/,
      run: function(data) {
        var moonInOut = {
          en: 'In',
        };
        data.moonInOut = moonInOut[data.lang] || moonInOut['en'];
      },
    },
    {
      id: 'Tsukuyomi Dark Blade',
      regex: / 14:2BDA:Tsukuyomi starts using Dark Blade/,
      infoText: function(data) {
        return {
          en: 'Left + ' + data.moonInOut,
          fr: 'Gauche + ' + data.moonInOut,
          de: 'Links + ' + data.moonInOut,
        };
      },
      tts: function(data) {
        return {
          en: 'Left + ' + data.moonInOut,
          fr: 'Gauche + ' + data.moonInOut,
          de: 'Links + ' + data.moonInOut,
        };
      },
    },
    {
      id: 'Tsukuyomi Bright Blade',
      regex: / 14:2BDB:Tsukuyomi starts using Bright Blade/,
      infoText: function(data) {
        return {
          en: 'Right + ' + data.moonInOut,
          fr: 'Droite + ' + data.moonInOut,
          de: 'Rechts + ' + data.moonInOut,
        };
      },
      tts: function(data) {
        return {
          en: 'Right + ' + data.moonInOut,
          fr: 'Droite + ' + data.moonInOut,
          de: 'Rechts + ' + data.moonInOut,
        };
      },
    },
    {
      id: 'Tsukuyomi Meteor Marker',
      regex: / 1B:........:(\y{Name}):....:....:0083:0000:0000:0000:/,
      condition: function(data, matches) { return (matches[1] == data.me); },
      alarmText: {
        en: 'Meteor on YOU',
      },
      tts: {
        en: 'Meteor on YOU',
      },
    },
	
	// Helper for those who want to stay alive till Meteor :D
	// Casttime of Spell ~9sec + 27 sec Delay to have 8 seconds to run to small Area
	// http://clees.me/guides/tsukuyomi-ex/
	/*
    0:00 – Moon Tick 1
    0:05 – Moon Tick 2
    0:10 – Moon Tick 3
    0:15 – Moon Tick 4 (Switch here if you have not)
    0:17 – Nightfall Begins
    0:20 – Moon Tick 5 + Weapon Appears
    0:25 – Moon Tick 6 + Gun Resolves
    ~0:28-0:29 – Spear Resolves
    0:30 –  Moon Tick 7 + Meteor position locked
    0:35 – Moon Tick 8 (You must be in the small color for this tick or you will not survive the following ticks) + Meteor explosion	
	*/
	{
	  id: 'Tsukuyomi Surpreme Selenomancy',
	  regex: /:Tsukuyomi uses Supreme Selenomancy/,
	  delaySeconds: 36,
	  alarmText: {
		  en: 'Move to small Area',
	  },
	  tts: {
		  en: 'Move to small Area',
	  }
	}

	
    // TODO: fan callouts
    // TODO: add timeline
    // TODO: mob location callouts for tank (maybe based on timeline)
    // TODO: debuff warnings (go to white, go to black) initially
    // TODO: debuff warnings (when at four stacks??)
  ]
}]
