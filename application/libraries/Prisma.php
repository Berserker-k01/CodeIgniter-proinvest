<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Prisma Library for CodeIgniter
 *
 * This library acts as a bridge between CodeIgniter and Prisma ORM
 */
class Prisma {
    private $CI;
    private $prismaExecutable;
    private $prismaClientPath;

    /**
     * Constructor
     */
    public function __construct() {
        $this->CI =& get_instance();
        $this->prismaExecutable = FCPATH . 'node_modules/.bin/prisma';
        $this->prismaClientPath = FCPATH . 'node_modules/.prisma/client/index.js';
        
        // Check if Prisma client exists
        if (!file_exists($this->prismaClientPath)) {
            log_message('error', 'Prisma client not found. Please run: npm install && npx prisma generate');
        }
    }
    
    /**
     * Execute Prisma CLI command
     * 
     * @param string $command The command to execute
     * @return string Command output
     */
    public function execute($command) {
        $fullCommand = $this->prismaExecutable . ' ' . $command;
        $output = shell_exec($fullCommand . ' 2>&1');
        
        return $output;
    }
    
    /**
     * Execute Prisma query using Node.js
     * 
     * @param string $model The Prisma model to query
     * @param string $operation The operation (findMany, findUnique, create, update, etc.)
     * @param array $params Query parameters
     * @return array|object|null Query result
     */
    public function query($model, $operation, $params = []) {
        // Create temporary JS file to execute query
        $tempFile = FCPATH . 'temp_' . uniqid() . '.js';
        $queryParams = json_encode($params);
        
        $jsContent = <<<JS
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();

        async function main() {
            try {
                const result = await prisma.$model.$operation($queryParams);
                console.log(JSON.stringify(result));
            } catch (error) {
                console.error(JSON.stringify({ error: error.message }));
                process.exit(1);
            } finally {
                await prisma.\$disconnect();
            }
        }

        main();
        JS;
        
        file_put_contents($tempFile, $jsContent);
        
        // Execute with Node.js
        $result = shell_exec('node ' . $tempFile . ' 2>&1');
        unlink($tempFile); // Clean up
        
        return json_decode($result);
    }
    
    /**
     * Find multiple records
     */
    public function findMany($model, $params = []) {
        return $this->query($model, 'findMany', $params);
    }
    
    /**
     * Find a unique record
     */
    public function findUnique($model, $params = []) {
        return $this->query($model, 'findUnique', $params);
    }
    
    /**
     * Create a new record
     */
    public function create($model, $data = []) {
        return $this->query($model, 'create', ['data' => $data]);
    }
    
    /**
     * Update an existing record
     */
    public function update($model, $where, $data = []) {
        return $this->query($model, 'update', [
            'where' => $where,
            'data' => $data
        ]);
    }
    
    /**
     * Delete a record
     */
    public function delete($model, $where) {
        return $this->query($model, 'delete', ['where' => $where]);
    }
    
    /**
     * Count records
     */
    public function count($model, $params = []) {
        return $this->query($model, 'count', $params);
    }
}
