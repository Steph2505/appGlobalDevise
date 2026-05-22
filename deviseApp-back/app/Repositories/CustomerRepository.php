<?php

namespace App\Repositories;

use App\Models\Customer;

class CustomerRepository extends ResourceRepository
{
    public function __construct(Customer $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->latest()->get();
    }

    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }
}
