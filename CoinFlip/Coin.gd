extends RigidBody

onready var camera = get_parent().get_node("Camera");
var flipping = false;
var heads_count = 0;
var total_count = 0;
var d = -1;
var waiting_to_flip = false;

var material = PhysicsMaterial.new();

func _ready():
	#camera.set_as_toplevel(true);
	randomize();
	material.friction = 5;
	physics_material_override = material;
	Engine.time_scale = 1.5;

func _physics_process(delta):
	camera.translation.x = translation.x;
	camera.translation.z = translation.z + 12;
	if d >= 0:
		translation = translation.linear_interpolate(Vector3.UP * 5, d);
		d += delta * 2;
	if Input.is_action_just_pressed("flip") or waiting_to_flip:
		if translation.distance_squared_to(Vector3.UP * 5) < 1:
			waiting_to_flip = false;
			d = -1;
			linear_velocity = Vector3.ZERO;
			angular_velocity = Vector3.ZERO;
			translation = Vector3.UP * 5;
			rotation = Vector3.ZERO if randf() > 0.5 else Vector3(PI, 0, 0);
			print("flip");
			flipping = true;
			var angle = 2 * PI * randf();
			add_torque(Vector3.UP * rand_range(-50, 50));
			add_force(Vector3.UP * rand_range(500, 600), Vector3(1.6 * cos(angle), 0, 1.6 * sin(angle)));
			material.bounce = 0.25;
			linear_damp = -1;
		elif d == -1:
			d = 0;
			waiting_to_flip = true;
	if linear_velocity.length_squared() < 1 and translation.y < 1 and flipping:
		material.bounce = 0;
		linear_damp = 0.1;
		flipping = false;
		var heads = abs(rotation_degrees.z) < 90;
		print("Heads" if heads else "Tails");

func _input(event):
	if event is InputEventMouseButton and event.is_pressed():
		waiting_to_flip = true;
