var wood_id = 17;

var realtime_current;

var rd = 0;

var rt_hour;

var rt_minutes;

var six = 0;

var m_time = 0;

var leafFall = 0;

var X, Y, Z, I, C, D = 0;

var xP;

var xY;

var xZ;

var smallrocks = [];

var rocks = [];

var bleeding_ents = [ EntityType.BAT, EntityType.CAVE_SPIDER, EntityType.CHICKEN, EntityType.COW, EntityType.CREEPER, EntityType.ENDERMAN, EntityType.GHAST, EntityType.MUSHROOM_COW, EntityType.OCELOT, EntityType.PIG, EntityType.PIG_ZOMBIE, EntityType.PLAYER, EntityType.PRIMED_TNT, EntityType.RABBIT, EntityType.SHEEP, EntityType.SILVERFISH, EntityType.SPIDER, EntityType.SQUID, EntityType.VILLAGER, EntityType.WOLF, EntityType.ZOMBIE, EntityType.ZOMBIE_VILLAGER ];

var rock_smallintensity = 800;

var timer = 20;

var rockResetSmall = 1900;

var rock_intensity = 1200;

var rockReset = 0;

var normal;

var small;

ModPE.setItem(700, "rock_small", 0, "smallRock", 1);

ModPE.langEdit("item.smallRock.name", "Small Rock");

Item.setMaxDamage(700, 1);

Item.setStackedByData(700, true);

Item.addShapedRecipe(700, 12, 0, [ "   ", " s ", "   " ], [ "s", 1, 0 ]);

Item.addShapedRecipe(700, 12, 0, [ "   ", " s ", "   " ], [ "s", 4, 0 ]);

ModPE.setItem(701, "rock_medium", 0, "rock", 1);

ModPE.langEdit("item.rock.name", "Rock");

Item.setMaxDamage(701, 1);

Item.setStackedByData(701, true);

Item.addShapedRecipe(701, 12, 0, [ "   ", " s ", "   " ], [ "s", 1, 2 ]);

Item.addShapedRecipe(701, 12, 0, [ "   ", " s ", "   " ], [ "s", 4, 2 ]);

Item.defineThrowable(800, "spear_wooden", 0, "Wooden Spear", 1);

Item.setStackedByData(800, true);

Item.addShapedRecipe(800, 1, 0, [ " w ", " s ", " s " ], [ "p", 5, 0, "w", 17, 0, "s", 280, 0 ]);

Item.defineThrowable(801, "spear_stone", 0, "Stone Spear", 1);

Item.setStackedByData(801, true);

Item.addShapedRecipe(801, 1, 0, [ " r ", " s ", " s " ], [ "r", 701, 0, "w", 17, 0, "s", 280, 0 ]);

Item.defineThrowable(802, "spear_iron", 0, "Iron Spear", 1);

Item.setStackedByData(802, true);

function useItem(a, b, c, d) {
    xP = a;
    xY = b;
    xZ = c;
    if (700 == d) {
        var e = Level.spawnMob(a, getSurface(a, c), c, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(e, 100);
        Entity.setRenderType(e, rock_smallRenderType.renderType);
        Entity.setCollisionSize(e, .1, .1);
        smallrocks.push(e);
        addItemInventory(700, -1);
    }
    if (701 == d) {
        var f = Level.spawnMob(a, getSurface(a, c), c, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(f, 100);
        Entity.setRenderType(f, rock_mediumRenderType.renderType);
        Entity.setCollisionSize(f, .1, .1);
        rocks.push(f);
        addItemInventory(701, -1);
    }
}

function destroyBlock(a, b, c, d) {
    var e = getTile(a, b, c);
    var f = Player.getCarriedItem();
    if (0 == f) {
        preventDefault();
        Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1);
    } else ;
    if (e == wood_id) {
        Level.destroyBlock(a, b, c, true);
        for (var g = b + 1; g < 256; g++) if (getTile(a, g, c) == wood_id) Level.destroyBlock(a, g, c, true); else break;
        if (700 == f || 701 == f) {
            addItemInventory(f, -1);
            Level.destroyBlock(a, b, c, true);
            for (var g = b + 1; g < 256; g++) if (getTile(a, g, c) == wood_id) Level.destroyBlock(a, g, c, true); else break;
        }
    }
}

function startDestroyBlock(a, b, c, d) {
    var e = getTile(a, b, c);
    var f = Player.getCarriedItem();
    if (0 == f) {
        preventDefault();
        Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1);
    } else ;
}

function continueDestroyBlock(a, b, c, d, e) {
    var f = Player.getCarriedItem();
    if (0 == f) {
        preventDefault();
        Player.setHealth(Entity.getHealth(getPlayerEnt()) - 1);
    } else ;
}

function newLevel() {
    I = ModPE.readData("I");
    clientMessage("Achievement get!:" + ChatColor.GREEN + " Realism in Minecraft");
    clientMessage("Follow @BagasMC_ on Twitter for more Mods!");
}

function modTick() {
    rd++;
    rockResetSmall--;
    leafFall++;
    rock_intensity--;
    rock_smallintensity--;
    timer--;
    realtime_current = new Date();
    if (rd > 1) {
        rt_hour = realtime_current.getHours();
        rt_minutes = realtime_current.getMinutes();
        Level.setTime(m_time);
        rd = 0;
    }
    if (6 == rt_hour) m_time = 0;
    if (7 == rt_hour) m_time = 1e3;
    if (8 == rt_hour) m_time = 2e3;
    if (9 == rt_hour) m_time = 3e3;
    if (10 == rt_hour) m_time = 4e3;
    if (11 == rt_hour) m_time = 5e3;
    if (12 == rt_hour) m_time = 6e3;
    if (13 == rt_hour) m_time = 7e3;
    if (14 == rt_hour) m_time = 8e3;
    if (15 == rt_hour) m_time = 9e3;
    if (16 == rt_hour) m_time = 1e4;
    if (17 == rt_hour) m_time = 11e3;
    if (18 == rt_hour) m_time = 12e3;
    if (19 == rt_hour) m_time = 13e3;
    if (20 == rt_hour) m_time = 14e3;
    if (21 == rt_hour) m_time = 15e3;
    if (22 == rt_hour) m_time = 16e3;
    if (23 == rt_hour) m_time = 17e3;
    if (0 == rt_hour) m_time = 18e3;
    if (1 == rt_hour) m_time = 19e3;
    if (2 == rt_hour) m_time = 2e4;
    if (3 == rt_hour) m_time = 21e3;
    if (4 == rt_hour) m_time = 22e3;
    if (5 == rt_hour) m_timr = 23e3;
    if (1 == I) {
        I = 0;
        ModPE.saveData("I", I);
        if (50 == Level.getTile(X, Y - 1, Z)) setTile(X, Y - 1, Z, 0);
    }
    if (50 == Player.getCarriedItem() || 325 == Player.getCarriedItem() || 169 == Player.getCarriedItem() || 91 == Player.getCarriedItem() || 89 == Player.getCarriedItem()) {
        X = getPlayerX();
        Y = getPlayerY();
        Z = getPlayerZ();
        T = Level.getTile(X, Y - 2, Z);
        if (0 != T && 8 != T && 9 != T && 10 != T && 11 != T && 18 != T && 20 != T && 30 != T && 31 != T && 32 != T && 37 != T && 38 != T && 39 != T && 40 != T && 50 != T && 51 != T && 53 != T && 59 != T && 68 != T && 63 != T && 64 != T && 65 != T && 67 != T && 71 != T && 78 != T && 79 != T && 83 != T && 92 != T && 102 != T && 105 != T && 106 != T && 107 != T && 108 != T && 109 != T && 114 != T && 128 != T && 156 != T && 0 == Level.getTile(X, Y - 1, Z)) {
            Level.setTile(X, Y - 1, Z, 50);
            I = 1;
            ModPE.saveData("I", I);
        }
    }
    for (i = 0; i < smallrocks.length; i++) {
        Entity.setImmobile(smallrocks[i], true);
        if (0 == Level.getTile(Entity.getX(smallrocks[i]), Entity.getY(smallrocks[i]) - 1, Entity.getZ(smallrocks[i]))) Entity.setPosition(smallrocks[i], Entity.getX(smallrocks[i]), Entity.getY(smallrocks[i]) - 1, Entity.getZ(smallrocks[i]));
    }
    for (i = 0; i < rocks.length; i++) {
        Entity.setImmobile(rocks[i], true);
        if (0 == Level.getTile(Entity.getX(rocks[i]), Entity.getY(rocks[i]) - 1, Entity.getZ(rocks[i]))) Entity.setPosition(rocks[i], Entity.getX(rocks[i]), Entity.getY(rocks[i]) - 1, Entity.getZ(rocks[i]));
    }
    var a = Math.floor(900 * Math.random() + 1);
    switch (a) {
      case 1:
        for (i = 0; i < smallrocks.length; i++) Entity.remove(smallrocks[i]);
        break;

      case 2:
        for (i = 0; i < rocks.length; i++) Entity.remove(rocks[i]);
    }
    var b = Math.floor(300 * Math.random() + 1);
    switch (b) {
      case 1:
        spawnRock(getPlayerX(), getPlayerY(), getPlayerZ(), normal);
        break;

      case 2:
        spawnRock(getPlayerX(), getPlayerY(), getPlayerZ(), small);
    }
}

function getSurface(a, b) {
    var c = 0;
    for (var d = 1; d <= 256; d++) if (0 == Level.getTile(a, d, b)) {
        c = d;
        break;
    }
    return c;
}

function attackHook(a, b) {
    var c = Entity.getEntityTypeId(EntityType.CHICKEN);
    var d = Player.getCarriedItem();
    if (a == Player.getEntity() && b == c) if (0 == d) Entity.setHealth(b, Entity.getHealth(b) - 3); else ;
    for (i = 0; i < smallrocks.length; i++) if (b == smallrocks[i]) {
        Level.dropItem(Entity.getX(smallrocks[i]), Entity.getY(smallrocks[i]) + 1, Entity.getZ(smallrocks[i]), 0, 700, 1, 0);
        Entity.remove(smallrocks[i]);
    }
    for (i = 0; i < rocks.length; i++) if (b == rocks[i]) {
        Level.dropItem(Entity.getX(rocks[i]), Entity.getY(rocks[i]) + 1, Entity.getZ(rocks[i]), 0, 701, 1, 0);
        Entity.remove(rocks[i]);
    }
    for (i = 0; i < bleeding_ents.length; i++) if (Entity.getEntityTypeId(b) == bleeding_ents[i]) {
        Level.addParticle(ParticleType.redstone, Entity.getX(b), Entity.getY(b) + 1, Entity.getZ(b), 0, 0, -2, 2);
        Level.addParticle(ParticleType.redstone, Entity.getX(b), Entity.getY(b) + 1, Entity.getZ(b), 0, -2, 0, 2);
        Level.addParticle(ParticleType.redstone, Entity.getX(b), Entity.getY(b) + 1, Entity.getZ(b), 0, -2, 0, 2);
        Level.addParticle(ParticleType.redstone, Entity.getX(b), Entity.getY(b) + 1, Entity.getZ(b) - 1, 0, -7, 0, 1);
    }
}

function spawnRock(a, b, c, d) {
    if (d == small) {
        var e = Math.floor(10 * Math.random());
        var f = Math.floor(10 * Math.random());
        var g = Level.spawnMob(a + f, getSurface(a, c), c + e, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(g, 100);
        Entity.setRenderType(g, rock_smallRenderType.renderType);
        Entity.setMaxHealth(g, 100);
        Entity.setCollisionSize(g, .1, .1);
        smallrocks.push(g);
    }
    if (d == normal) {
        var e = Math.floor(15 * Math.random());
        var f = Math.floor(15 * Math.random());
        var h = Level.spawnMob(a + f, getSurface(a, c), c + e, EntityType.SHEEP, "mob/rock_texture.png");
        Entity.setHealth(h, 100);
        Entity.setRenderType(h, rock_mediumRenderType.renderType);
        Entity.setMaxHealth(h, 100);
        Entity.setCollisionSize(h, .1, .1);
        rocks.push(h);
    }
}

function entityAddedHook(a) {
    if (33 == Entity.getEntityTypeId(a)) Entity.remove(a);
}

function customThrowableHitBlockHook(a, b, c, d, e, f) {
    if (800 == b) Level.dropItem(c, d, e, 0, 800, 1, 0);
    if (801 == b) Level.dropItem(e, d, e, 0, 801, 1, 0);
    if (802 == b) Level.dropItem(c, d, e, 0, 802, 1, 0);
}

function customThrowableHitEntityHook(a, b, c) {
    if (800 == b) {
        Level.dropItem(Entity.getX(c), Entity.getY(c), Entity.getZ(c), 0, 800, 1, 0);
        var d = 20;
        Entity.setHealth(c, Entity.getHealth(c) - d);
    }
    if (801 == b) {
        Level.dropItem(Entity.getX(c), Entity.getY(c), Entity.getZ(c), 0, 801, 1, 0);
        var d = 30;
        Entity.setHealth(c, Entity.getHealth(c) - d);
    }
    if (802 == b) {
        Level.dropItem(Entity.getX(c), Entity.getY(c), Entity.getZ(c), 0, 802, 1, 0);
        var d = 50;
        Entity.setHealth(c, Entity.getHealth(c) - d);
    }
}

function addrock_mediumRenderType(a) {
    var b = a.getModel();
    var c = b.getPart("head").clear();
    var d = b.getPart("body").clear();
    var e = b.getPart("rightArm").clear();
    var f = b.getPart("leftArm").clear();
    var g = b.getPart("rightLeg").clear();
    var h = b.getPart("leftLeg").clear();
    d.setTextureOffset(16, 16);
    d.addBox(-2.5, 21.5, -2.5, 4, 3, 4);
    d.setTextureOffset(16, 16);
    d.addBox(-2, 21, -2, 3, 3, 3);
    d.setTextureOffset(16, 16);
    d.addBox(-3, 22, -1, 5, 2, 2);
    d.setTextureOffset(16, 16);
    d.addBox(-3.5, 22.5, -2, 5, 2, 2);
    d.setTextureOffset(16, 16);
    d.addBox(-1.5, 22, 0, 3, 2, 2);
}

var rock_mediumRenderType = Renderer.createHumanoidRenderer();

addrock_mediumRenderType(rock_mediumRenderType);

function addrock_smallRenderType(a) {
    var b = a.getModel();
    var c = b.getPart("head").clear();
    var d = b.getPart("body").clear();
    var e = b.getPart("rightArm").clear();
    var f = b.getPart("leftArm").clear();
    var g = b.getPart("rightLeg").clear();
    var h = b.getPart("leftLeg").clear();
    d.setTextureOffset(16, 16);
    d.addBox(-2.5, 22.5, -2.5, 4, 2, 4);
    d.setTextureOffset(16, 16);
    d.addBox(-2, 22, -2, 3, 2, 3);
    d.setTextureOffset(16, 16);
    d.addBox(-3, 23, -1, 5, 1, 2);
    d.setTextureOffset(16, 16);
    d.addBox(-3.5, 23.5, -2, 5, 1, 2);
    d.setTextureOffset(16, 16);
    d.addBox(-1.5, 23, 0, 3, 1, 2);
}

var rock_smallRenderType = Renderer.createHumanoidRenderer();

addrock_smallRenderType(rock_smallRenderType);
