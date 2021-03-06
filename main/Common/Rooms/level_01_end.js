/***========================================================***/
/***    This the ending screen for Level 01: "Shadowman"    ***/
/***========================================================***/
/* Here should go whatever is supposed to happen at the completion
 * of level 01, as of right now, that can be accomplished by 
 * "firing" upon any previous target...
 */

var level_01_end = new Sprite(); 

	/***==============================***/
	/***         room.create()        ***/
	/***==============================***/
	// What to do at creation time
	level_01_end.create = function() {
		// Stop the audio coming from level 01
		level_01_hub.stopAudio();
		
		switch(level_01_hub.ending_state){
			case 1:
				level_01_end.string = "\"RECENTLY DIVORCED MAN FOUND SHOT\"\n" +
					"This week has not been kind to poor local \nresident Johnathan Shmitt.\n"+
					"... He was fired from his job last Friday only \nto come home to divorce papers...\n" +
					"...His ex-wife had this to say. \"Serves him right for \nnot being able to provide for our needs...\"\n"+
					"\n\n In other news.... ";
				break;
			case 2:
				correctlyshot += 1;
				level_01_end.string = "\"MAN FOUND SHOT NEAR CAR ON THE HIGHWAY OVERPASS\"\n"+
				"...The weird thing is that no one knew who he was. \nThis man has no record of ever even existing..."+
				"\n\n In other news....";
				break;
			case 3:
				level_01_end.string = "\"WOMAN LEFT WIDOWED AFTER HER HUSBAND WAS SHOT\"\n" +
				"\"They killed my husband!\" his wife screamed as \nreporters tried to get a statement from her\n" +
				"... Dylan Smith recently moved into our little\n"+
				"community only to be brutally gunned down weeks later.\n"+
				"... His wife eventually told us that they had moved \nhere to get away from gang violence elsewhere...\n\nin other news...\"";
				break;
			case 4:
				level_01_end.string = "\"LOCAL JUNKIE FOUND DEAD IN UNDERPASS \"\n"+
				"His identity is still disputed as no one has \nclaimed to know him...\n" +
				"... Could this be part of a deal gone bad, or was this\n"+
				"guy involved in stuff he shouldn't have been..."
				"\n\nIn other news...";
				break;
		}
				
		
		/***==============================***/
		/***       Passive sprites        ***/
		/***==============================***/
		// Sprites to be drawn, but without interactivity
		level_01_end.some_text = new TextBox(level_01_end.string);
		level_01_end.some_text.font = "Courier";
		level_01_end.some_text.color = "White";
		level_01_end.some_text.fontSize = 30;
		level_01_end.some_text.x = 100;
		level_01_end.some_text.y = 150;
		textType(level_01_end.some_text, 2);
		
		level_01_end.white_screen = new Sprite();
		level_01_end.white_screen.width  = 1080;
		level_01_end.white_screen.height = 720;
		level_01_end.white_screen.do_update = true;
		level_01_end.white_screen.image = Textures.load("./Common/Textures/white box.png");
		level_01_end.white_screen.update = function() {
			if(level_01_end.white_screen.do_update) {
				if(level_01_end.white_screen.alpha > 0.00)
					level_01_end.white_screen.alpha -= 0.01;
				else {
					world.addChild(level_01_end.some_text);
					world.addChild(level_01_end.button_continue);
					active_sprites.push(level_01_end.button_continue);
					level_01_end.white_screen.do_update = false;
				}
			}
		}
		
		/***=== End of passive sprites ===***/
		
		/***==============================***/
		/***        Active sprites        ***/
		/***==============================***/
		// Sprites to be available to input_manager
		level_01_end.button_continue = new TextBox("continue >>");
		level_01_end.button_continue.font = "Courier";
		level_01_end.button_continue.color = "White";
		level_01_end.button_continue.fontSize = 30;
		level_01_end.button_continue.x = 877;
		level_01_end.button_continue.y = 690;
		level_01_end.button_continue.update = function() {
			if(level_01_end.button_continue.mouseOver) {
				level_01_end.button_continue.color = "#484848";
			}else {
				level_01_end.button_continue.color = "White";
			}
		}
		level_01_end.button_continue.click = function() {
			changeRoom(level_02_folder);
		}
		
		/***===     End of active sprites   ===***/
		
		/***===================================***/
		/***            Room audio             ***/
		/***===================================***/
		// This room's audio objects
		sound_shot.play();
		
		/***===================================***/
		/***          World allocating         ***/
		/***===================================***/
		// Visible sprites at creation time
		world.addChild(level_01_end.white_screen);
		
		// Active sprites at creation time
	}
	
	/***===============================***/
	/***        Clear this room        ***/
	/***===============================***/
	// Remove from the world, un-draw sprites, etc...
	level_01_end.clear = function() {
		world.removeChild(level_01_end.some_text);
		world.removeChild(level_01_end.button_continue);
		
		while(active_sprites.length > 0)
			active_sprites.pop();
	}