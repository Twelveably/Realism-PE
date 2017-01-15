/*This work is licensed under the Creative Commons Attribution- NonCommercial 4.0 International License. To view a copy
of this license, visit http://creativecommons.org/licenses/by-nc/4.0/ or send a letter to Creative Commons, 444 Castro
Street, Suite 900, Mountain View, California, 94041, USA.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/


/*############
CONFIGURATION
#############*/

var wood_id = 17;
var realtime_current;
var rd = 0;
var rt_hour;
var rt_minutes;
var six = 0
var m_time = 0;
var leafFall = 0;
var X, Y, Z, I, C, D = 0;
var xP;
var xY;
var xZ;
var smallrocks = [];
var rocks = [];
var bleeding_ents = [EntityType.BAT, EntityType.CAVE_SPIDER, EntityType.CHICKEN, EntityType.COW, EntityType.CREEPER, EntityType.ENDERMAN, EntityType.GHAST, EntityType.MUSHROOM_COW, EntityType.OCELOT, EntityType.PIG, EntityType.PIG_ZOMBIE, EntityType.PLAYER, EntityType.PRIMED_TNT, EntityType.RABBIT, EntityType.SHEEP, EntityType.SILVERFISH, EntityType.SPIDER, EntityType.SQUID, EntityType.VILLAGER, EntityType.WOLF, EntityType.ZOMBIE, EntityType.ZOMBIE_VILLAGER];
var rock_smallintensity = 800;
var timer = 20;
var rockResetSmall = 1900;
var rock_intensity = 1200;
var rockReset = 00;
var normal;
var small;

/*############
ITEMS
#############*/

ModPE.setItem(700, "rock_small", 0, "smallRock", 1);
ModPE.langEdit("item.smallRock.name", "Small Rock");
Item.setMaxDamage(700, 1);
Item.setStackedByData(700, true);
Item.addShapedRecipe(700, 12, 0, ["   ", " s ", "   "], ["s", 1, 0]);
Item.addShapedRecipe(700, 12, 0, ["   ", " s ", "   "], ["s", 4, 0]);

ModPE.setItem(701, "rock_medium", 0, "rock", 1);
ModPE.langEdit("item.rock.name", "Rock");
Item.setMaxDamage(701, 1);
Item.setStackedByData(701, true);
Item.addShapedRecipe(701, 12, 0, ["   ", " s ", "   "], ["s", 1, 2]);
Item.addShapedRecipe(701, 12, 0, ["   ", " s ", "   "], ["s", 4, 2]);

Item.defineThrowable(800, "spear_wooden", 0, "Wooden Spear", 1);
Item.setStackedByData(800, true);
Item.addShapedRecipe(800, 1, 0, [" w ", " s ", " s "], ["p", 5, 0, "w", 17, 0, "s", 280, 0]);

Item.defineThrowable(801, "spear_stone", 0, "Stone Spear", 1);
Item.setStackedByData(801, true);
Item.addShapedRecipe(801, 1, 0, [" r ", " s ", " s "], ["r", 701, 0, "w", 17, 0, "s", 280, 0]);

Item.defineThrowable(802, "spear_iron", 0, "Iron Spear", 1);
Item.setStackedByData(802, true);



/*############
PHYSICS & ITEMS ENGINE
#############*/

function useItem(x, y, z, itemId) {
    xP = x;
    xY = y;
    xZ = z;
    if (itemId == 700) {
        var rock_smallm = Level.spawnMob(x, getSurface(x, z), z, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(rock_smallm, 100);
        Entity.setRenderType(rock_smallm, rock_smallRenderType.renderType);
        Entity.setCollisionSize(rock_smallm, 0.1, 0.1);
        smallrocks.push(rock_smallm);
        addItemInventory(700, -1);
    }
    if (itemId == 701) {
        var rock = Level.spawnMob(x, getSurface(x, z), z, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(rock, 100);
        Entity.setRenderType(rock, rock_mediumRenderType.renderType);
        Entity.setCollisionSize(rock, 0.1, 0.1);
        rocks.push(rock);
        addItemInventory(701, -1);
    }
}

function destroyBlock(x, y, z, side) {
    var tile = getTile(x, y, z);
    var player_inHand = Player.getCarriedItem();
    if (player_inHand == 0) {
        preventDefault();
        Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1)
    } else {}
    if (tile == wood_id) {
        Level.destroyBlock(x, y, z, true);
        for (var i = y + 1; i < 256; i++) {
            if (getTile(x, i, z) == wood_id) {
                Level.destroyBlock(x, i, z, true);
            } else {
                break;
            }
        }
        if (player_inHand == 700 || player_inHand == 701) {
            addItemInventory(player_inHand, -1);
            Level.destroyBlock(x, y, z, true);
            for (var i = y + 1; i < 256; i++) {
                if (getTile(x, i, z) == wood_id) {
                    Level.destroyBlock(x, i, z, true);
                } else {
                    break;
                }
            }
        }
    }
}

function startDestroyBlock(x, y, z, side) {
    var tile = getTile(x, y, z);
    var player_inHand = Player.getCarriedItem();
    if (player_inHand == 0) {
        preventDefault();
        Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1)
    } else {}
}

function continueDestroyBlock(x, y, z, side, progress) {
    var player_inHand = Player.getCarriedItem();
    if (player_inHand == 0) {
        preventDefault();
        Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1)
    } else {}
}

function newLevel() {
    I = ModPE.readData("I");
    clientMessage("Achievement get!:" + ChatColor.GREEN + " Realism in Minecraft")
    clientMessage("Follow @BagasMC_ on Twitter for more Mods!")
}

function modTick() {
    rd++;
    rockResetSmall--;
    leafFall++;
    rock_intensity--;
    rock_smallintensity--;
    timer--;
    realtime_current = new Date();  
    //ModPE.showTipMessage(rt_hour + " " + m_time + " " + Player.getCarriedItem())
    if (rd > 1) {
        rt_hour = realtime_current.getHours();
        rt_minutes = realtime_current.getMinutes();
        Level.setTime(m_time)
        rd = 0;
    }   if(rt_hour==6){m_time=0}if(rt_hour==7){m_time=1000}if(rt_hour==8){m_time=2000}if(rt_hour==9){m_time=3000}if(rt_hour==10){m_time=4000}if(rt_hour==11){m_time=5000}if(rt_hour==12){m_time=6000}if(rt_hour==13){m_time=7000}if(rt_hour==14){m_time=8000}if(rt_hour==15){m_time=9000}if(rt_hour==16){m_time=10000}if(rt_hour==17){m_time=11000}if(rt_hour==18){m_time=12000}if(rt_hour==19){m_time=13000}if(rt_hour==20){m_time=14000}if(rt_hour==21){m_time=15000}if(rt_hour==22){m_time=16000}if(rt_hour==23){m_time=17000}if(rt_hour==0){m_time=18000}if(rt_hour==1){m_time=19000}if(rt_hour==2){m_time=20000}if(rt_hour==3){m_time=21000}if(rt_hour==4){m_time=22000}if(rt_hour==5){m_timr=23000}
    if (I == 1) {
        I = 0;
        ModPE.saveData("I", I);
        if (Level.getTile(X, Y - 1, Z) == 50) {
            setTile(X, Y - 1, Z, 0);
        }
    }
    if (Player.getCarriedItem() == 50 || Player.getCarriedItem() == 325 || Player.getCarriedItem() == 169 || Player.getCarriedItem() == 91 || Player.getCarriedItem() == 89) {
        X = getPlayerX();
        Y = getPlayerY();
        Z = getPlayerZ();
        T = Level.getTile(X, Y - 2, Z);
        if (T != 0 && T != 8 && T != 9 && T != 10 && T != 11 && T != 18 && T != 20 && T != 30 && T != 31 && T != 32 && T != 37 && T != 38 && T != 39 && T != 40 && T != 50 && T != 51 && T != 53 && T != 59 && T != 68 && T != 63 && T != 64 && T != 65 && T != 67 && T != 71 && T != 78 && T != 79 && T != 83 && T != 92 && T != 102 && T != 105 && T != 106 && T != 107 && T != 108 && T != 109 && T != 114 && T != 128 && T != 156 && Level.getTile(X, Y - 1, Z) == 0) {
            Level.setTile(X, Y - 1, Z, 50);
            I = 1;
            ModPE.saveData("I", I);
        }
    }
    //if(Level.getTile(xP, xY, xZ) == 17) {
    //if(leafFall > 20) { 
    //Level.addParticle(ParticleType.fallingDust, xP, xY-1, xZ, 0, 0, 0, 2);

    //leafFall = 0;
    //}
    //}

    for (i = 0; i < smallrocks.length; i++) {
        Entity.setImmobile(smallrocks[i], true)
        if (Level.getTile(Entity.getX(smallrocks[i]), Entity.getY(smallrocks[i]) - 1, Entity.getZ(smallrocks[i])) == 0) {
            Entity.setPosition(smallrocks[i], Entity.getX(smallrocks[i]), Entity.getY(smallrocks[i]) - 1, Entity.getZ(smallrocks[i]))
        }
    }
    for (i = 0; i < rocks.length; i++) {
        Entity.setImmobile(rocks[i], true)
        if (Level.getTile(Entity.getX(rocks[i]), Entity.getY(rocks[i]) - 1, Entity.getZ(rocks[i])) == 0) {
            Entity.setPosition(rocks[i], Entity.getX(rocks[i]), Entity.getY(rocks[i]) - 1, Entity.getZ(rocks[i]))
        }
    }
    var spawnRockA = Math.floor((Math.random() * 900) + 1);

    switch (spawnRockA) {
        case 1:
            for (i = 0; i < smallrocks.length; i++) {
                Entity.remove(smallrocks[i])
            }
            break;

        case 2:
            for (i = 0; i < rocks.length; i++) {
                Entity.remove(rocks[i])
            }
            break;
    }
    var spawnRockC = Math.floor((Math.random() * 300) + 1);

    switch (spawnRockC) {
        case 1:
            spawnRock(getPlayerX(), getPlayerY(), getPlayerZ(), normal);
            break;

        case 2:
            spawnRock(getPlayerX(), getPlayerY(), getPlayerZ(), small);
            break;

    }
}

function getSurface(a, b) {
    var c = 0;
    for (var d = 1; d <= 256; d++)
        if (0 == Level.getTile(a, d, b)) {
            c = d;
            break;
        }
    return c;
}

function attackHook(a, v) {
    var ci = Entity.getEntityTypeId(EntityType.CHICKEN);
    var player_inHand = Player.getCarriedItem();
    if (a == Player.getEntity() && v == ci) {
        if (player_inHand == 0) {
            Entity.setHealth(v, Entity.getHealth(v) - 3)
        } else {}
    }
    for (i = 0; i < smallrocks.length; i++) {
        if (v == smallrocks[i]) {
            Level.dropItem(Entity.getX(smallrocks[i]), Entity.getY(smallrocks[i]) + 1, Entity.getZ(smallrocks[i]), 0, 700, 1, 0);
            Entity.remove(smallrocks[i])
        }
    }
    for (i = 0; i < rocks.length; i++) {
        if (v == rocks[i]) {
            Level.dropItem(Entity.getX(rocks[i]), Entity.getY(rocks[i]) + 1, Entity.getZ(rocks[i]), 0, 701, 1, 0);
            Entity.remove(rocks[i])
        } 
    }
    for (i = 0; i < bleeding_ents.length; i++) {
        if (Entity.getEntityTypeId(v) == bleeding_ents[i]) {
            Level.addParticle(ParticleType.redstone,Entity.getX(v),Entity.getY(v)+1,Entity.getZ(v),0,0,-2,2); 		Level.addParticle(ParticleType.    redstone,Entity.getX(v),Entity.getY(v)+1,Entity.getZ(v),0,-2,0,2); 		Level.addParticle(ParticleType.redstone,Entity.getX(v),Entity.getY(v)+1,Entity.getZ(v),0,-2,0,2); 		Level.addParticle(ParticleType.redstone,Entity.getX(v),Entity.getY(v)+1,Entity.getZ(v)-1,0,-7,0,1);
        } 
    }
}

function spawnRock(x, y, z, size) {
    if (size == small) {
        var d2 = Math.floor(Math.random() * 10);
        var d1 = Math.floor(Math.random() * 10);
        var rock_smallm = Level.spawnMob(x + d1, getSurface(x, z), z + d2, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(rock_smallm, 100);
        Entity.setRenderType(rock_smallm, rock_smallRenderType.renderType);
        Entity.setMaxHealth(rock_smallm, 100);
        Entity.setCollisionSize(rock_smallm, 0.1, 0.1);
        smallrocks.push(rock_smallm);
    }
    if (size == normal) {
        var d2 = Math.floor(Math.random() * 15);
        var d1 = Math.floor(Math.random() * 15);
        var rock = Level.spawnMob(x + d1, getSurface(x, z), z + d2, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(rock, 100);
        Entity.setRenderType(rock, rock_mediumRenderType.renderType);
        Entity.setMaxHealth(rock, 100);
        Entity.setCollisionSize(rock, 0.1, 0.1);
        rocks.push(rock);
    }
}

    function entityAddedHook(entity) {
        if (Entity.getEntityTypeId(entity) == 33) {
            Entity.remove(entity)
        }
    }

    function customThrowableHitBlockHook(projectile, itemId, x, y, z, side) {
        if (itemId == 800) {
            Level.dropItem(x, y, z, 0, 800, 1, 0);
        }
        if (itemId == 801) {
            Level.dropItem(z, y, z, 0, 801, 1, 0);
        }
        if (itemId == 802) {
            Level.dropItem(x, y, z, 0, 802, 1, 0);
        }
    }

    function customThrowableHitEntityHook(projectile, itemId, target) {
        if (itemId == 800) {
            Level.dropItem(Entity.getX(target), Entity.getY(target), Entity.getZ(target), 0, 800, 1, 0);

            var dmg = 20;

            Entity.setHealth(target, Entity.getHealth(target) - dmg);
        }
        if (itemId == 801) {
            Level.dropItem(Entity.getX(target), Entity.getY(target), Entity.getZ(target), 0, 801, 1, 0);

            var dmg = 30;

            Entity.setHealth(target, Entity.getHealth(target) - dmg);
        }
        if (itemId == 802) {
            Level.dropItem(Entity.getX(target), Entity.getY(target), Entity.getZ(target), 0, 802, 1, 0);

            var dmg = 50;

            Entity.setHealth(target, Entity.getHealth(target) - dmg);
        }
    }

    /*############
    MODEL RENDERERS
    #############*/

    function addrock_mediumRenderType(renderer) {
        var model = renderer.getModel();
        var head = model.getPart("head").clear();
        var body = model.getPart("body").clear();
        var rArm = model.getPart("rightArm").clear();
        var lArm = model.getPart("leftArm").clear();
        var rLeg = model.getPart("rightLeg").clear();
        var lLeg = model.getPart("leftLeg").clear();
        body.setTextureOffset(16, 16);
        body.addBox(-2.5, 21.5, -2.5, 4, 3, 4);
        body.setTextureOffset(16, 16);
        body.addBox(-2, 21, -2, 3, 3, 3);
        body.setTextureOffset(16, 16);
        body.addBox(-3, 22, -1, 5, 2, 2);
        body.setTextureOffset(16, 16);
        body.addBox(-3.5, 22.5, -2, 5, 2, 2);
        body.setTextureOffset(16, 16);
        body.addBox(-1.5, 22, 0, 3, 2, 2)
    }
    var rock_mediumRenderType = Renderer.createHumanoidRenderer();
    addrock_mediumRenderType(rock_mediumRenderType);

    function addrock_smallRenderType(renderer) {
        var model = renderer.getModel();
        var head = model.getPart("head").clear();
        var body = model.getPart("body").clear();
        var rArm = model.getPart("rightArm").clear();
        var lArm = model.getPart("leftArm").clear();
        var rLeg = model.getPart("rightLeg").clear();
        var lLeg = model.getPart("leftLeg").clear();
        body.setTextureOffset(16, 16);
        body.addBox(-2.5, 22.5, -2.5, 4, 2, 4);
        body.setTextureOffset(16, 16);
        body.addBox(-2, 22, -2, 3, 2, 3);
        body.setTextureOffset(16, 16);
        body.addBox(-3, 23, -1, 5, 1, 2);
        body.setTextureOffset(16, 16);
        body.addBox(-3.5, 23.5, -2, 5, 1, 2);
        body.setTextureOffset(16, 16);
        body.addBox(-1.5, 23, 0, 3, 1, 2)
    }
    var rock_smallRenderType = Renderer.createHumanoidRenderer();
    addrock_smallRenderType(rock_smallRenderType);
