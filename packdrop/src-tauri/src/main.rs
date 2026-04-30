#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command]
fn list_python_packages() -> String {
    let output = Command::new("pip")
        .args(["list", "--format=json"])
        .output()
        .expect("Failed to run pip");
    String::from_utf8_lossy(&output.stdout).to_string()
}

#[tauri::command]
fn uninstall_python_packages(packages: Vec<String>) -> String {
    let mut args = vec!["uninstall", "-y"];
    let pkg_refs: Vec<&str> = packages.iter().map(|s| s.as_str()).collect();
    args.extend(pkg_refs);
    let output = Command::new("pip").args(&args).output().expect("Failed to uninstall");
    String::from_utf8_lossy(&output.stderr).to_string()
}

#[tauri::command]
fn list_node_packages() -> String {
    let output = Command::new("npm")
        .args(["ls", "-g", "--depth=0", "--json"])
        .output()
        .expect("Failed to run npm");
    String::from_utf8_lossy(&output.stdout).to_string()
}

#[tauri::command]
fn uninstall_node_packages(packages: Vec<String>) -> String {
    let mut args = vec!["uninstall".to_string(), "-g".to_string()];
    args.extend(packages);
    let output = Command::new("npm").args(&args).output().expect("Failed to uninstall");
    String::from_utf8_lossy(&output.stderr).to_string()
}

#[tauri::command]
fn list_brew_packages() -> String {
    let output = Command::new("brew")
        .args(["list", "--formula", "--versions"])
        .output()
        .expect("Failed to run brew");
    String::from_utf8_lossy(&output.stdout).to_string()
}

#[tauri::command]
fn uninstall_brew_packages(packages: Vec<String>) -> String {
    let mut args = vec!["uninstall".to_string()];
    args.extend(packages);
    let output = Command::new("brew").args(&args).output().expect("Failed to uninstall");
    String::from_utf8_lossy(&output.stderr).to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_python_packages,
            uninstall_python_packages,
            list_node_packages,
            uninstall_node_packages,
            list_brew_packages,
            uninstall_brew_packages,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}