<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Region extends Model
{
    protected $fillable=[
        'region_name'
    ];

    public function voterProfile() : HasOne{
      return $this->hasOne(VoterProfile::class);
    }
}
