var bigml = require('bigml');
var connection = new bigml.BigML('myusername',
    'ae579e7e53fb9abd646a6ff8aa99d4afe83ac291')


function predictTopic(age, city, gender, language, optionvalue) {
    if (age == null) {
        return "Medical";
    } else if (age > 34) {
        if (gender == null) {
            return "Medical";
        } else if (gender == "male") {
            if (optionvalue == null) {
                return "Medical";
            } else if (optionvalue == "relaxation") {
                if (language == null) {
                    return "water";
                } else if (language == "amharic") {
                    return "information";
                } else if (language != "amharic") {
                    if (language == "hebrew") {
                        return "Medical";
                    } else if (language != "hebrew") {
                        return "water";
                    }
                }
            } else if (optionvalue != "relaxation") {
                if (city == null) {
                    return "Medical";
                } else if (city == "jerusalem") {
                    if (age > 72) {
                        if (language == null) {
                            return "water";
                        } else if (language == "hebrew") {
                            return "food";
                        } else if (language != "hebrew") {
                            return "water";
                        }
                    } else if (age <= 72) {
                        if (language == null) {
                            return "Medical";
                        } else if (language == "russian") {
                            return "food";
                        } else if (language != "russian") {
                            if (optionvalue == "Emergency routine") {
                                return "Medical";
                            } else if (optionvalue != "Emergency routine") {
                                if (age > 52) {
                                    if (age > 57) {
                                        return "Medical";
                                    } else if (age <= 57) {
                                        return "water";
                                    }
                                } else if (age <= 52) {
                                    return "Medical";
                                }
                            }
                        }
                    }
                } else if (city != "jerusalem") {
                    if (age > 57) {
                        return "Medical";
                    } else if (age <= 57) {
                        if (age > 45) {
                            if (optionvalue == "Emergency routine") {
                                return "information";
                            } else if (optionvalue != "Emergency routine") {
                                return "food";
                            }
                        } else if (age <= 45) {
                            if (optionvalue == "Emergency routine") {
                                return "food";
                            } else if (optionvalue != "Emergency routine") {
                                return "Medical";
                            }
                        }
                    }
                }
            }
        } else if (gender == "female") {
            if (age > 52) {
                if (age > 71) {
                    if (language == null) {
                        return "evacuation";
                    } else if (language == "hebrew") {
                        return "shelter";
                    } else if (language != "hebrew") {
                        return "evacuation";
                    }
                } else if (age <= 71) {
                    if (city == null) {
                        return "Medical";
                    } else if (city == "telAviv") {
                        return "evacuation";
                    } else if (city != "telAviv") {
                        return "Medical";
                    }
                }
            } else if (age <= 52) {
                if (language == null) {
                    return "food";
                } else if (language == "amharic") {
                    return "water";
                } else if (language != "amharic") {
                    if (age > 41) {
                        if (optionvalue == null) {
                            return "Medical";
                        } else if (optionvalue == "Emergency routine") {
                            return "food";
                        } else if (optionvalue != "Emergency routine") {
                            return "Medical";
                        }
                    } else if (age <= 41) {
                        if (language == "hebrew") {
                            return "food";
                        } else if (language != "hebrew") {
                            return "food";
                        }
                    }
                }
            }
        }
    } else if (age <= 34) {
        if (language == null) {
            return "Medical";
        } else if (language == "english") {
            if (city == null) {
                return "Medical";
            } else if (city == "jerusalem") {
                return "Medical";
            } else if (city != "jerusalem") {
                if (age > 19) {
                    if (optionvalue == null) {
                        return "Medical";
                    } else if (optionvalue == "Emergency routine") {
                        return "Medical";
                    } else if (optionvalue != "Emergency routine") {
                        return "Medical";
                    }
                } else if (age <= 19) {
                    if (gender == null) {
                        return "food";
                    } else if (gender == "male") {
                        return "food";
                    } else if (gender == "female") {
                        return "food";
                    }
                }
            }
        } else if (language != "english") {
            if (language == "amharic") {
                if (gender == null) {
                    return "Medical";
                } else if (gender == "male") {
                    if (city == null) {
                        return "Medical";
                    } else if (city == "jerusalem") {
                        if (optionvalue == null) {
                            return "evacuation";
                        } else if (optionvalue == "relaxation") {
                            return "Medical";
                        } else if (optionvalue != "relaxation") {
                            if (optionvalue == "Emergency routine") {
                                return "evacuation";
                            } else if (optionvalue != "Emergency routine") {
                                return "evacuation";
                            }
                        }
                    } else if (city != "jerusalem") {
                        return "Medical";
                    }
                } else if (gender == "female") {
                    return "Medical";
                }
            } else if (language != "amharic") {
                if (city == null) {
                    return "Medical";
                } else if (city == "telAviv") {
                    if (gender == null) {
                        return "Medical";
                    } else if (gender == "male") {
                        return "Medical";
                    } else if (gender == "female") {
                        if (optionvalue == null) {
                            return "Medical";
                        } else if (optionvalue == "Emergency routine") {
                            return "Medical";
                        } else if (optionvalue != "Emergency routine") {
                            return "drugs";
                        }
                    }
                } else if (city != "telAviv") {
                    if (language == "hebrew") {
                        if (city == "haifa") {
                            if (optionvalue == null) {
                                return "Medical";
                            } else if (optionvalue == "Emergency routine") {
                                return "drugs";
                            } else if (optionvalue != "Emergency routine") {
                                return "Medical";
                            }
                        } else if (city != "haifa") {
                            if (age > 23) {
                                if (optionvalue == null) {
                                    return "Medical";
                                } else if (optionvalue == "relaxation") {
                                    if (age > 28) {
                                        if (age > 31) {
                                            return "Medical";
                                        } else if (age <= 31) {
                                            return "water";
                                        }
                                    } else if (age <= 28) {
                                        if (city == "jerusalem") {
                                            if (age > 26) {
                                                return "evacuation";
                                            } else if (age <= 26) {
                                                return "Medical";
                                            }
                                        } else if (city != "jerusalem") {
                                            return "Medical";
                                        }
                                    }
                                } else if (optionvalue != "relaxation") {
                                    if (city == "Ashkelon") {
                                        return "information";
                                    } else if (city != "Ashkelon") {
                                        return "Medical";
                                    }
                                }
                            } else if (age <= 23) {
                                if (age > 19) {
                                    if (optionvalue == null) {
                                        return "Medical";
                                    } else if (optionvalue == "Emergency routine") {
                                        if (age > 21) {
                                            return "water";
                                        } else if (age <= 21) {
                                            return "Medical";
                                        }
                                    } else if (optionvalue != "Emergency routine") {
                                        if (age > 21) {
                                            return "Medical";
                                        } else if (age <= 21) {
                                            if (gender == null) {
                                                return "drugs";
                                            } else if (gender == "male") {
                                                return "drugs";
                                            } else if (gender == "female") {
                                                return "drugs";
                                            }
                                        }
                                    }
                                } else if (age <= 19) {
                                    if (city == "naaria") {
                                        return "shelter";
                                    } else if (city != "naaria") {
                                        if (city == "ashdod") {
                                            if (gender == null) {
                                                return "Medical";
                                            } else if (gender == "male") {
                                                if (optionvalue == null) {
                                                    return "Medical";
                                                } else if (optionvalue == "Emergency") {
                                                    return "Medical";
                                                } else if (optionvalue != "Emergency") {
                                                    return "drugs";
                                                }
                                            } else if (gender == "female") {
                                                return "shelter";
                                            }
                                        } else if (city != "ashdod") {
                                            if (age > 18) {
                                                return "information";
                                            } else if (age <= 18) {
                                                if (optionvalue == null) {
                                                    return "Medical";
                                                } else if (optionvalue == "Emergency routine") {
                                                    if (city == "Ashkelon") {
                                                        if (gender == null) {
                                                            return "Medical";
                                                        } else if (gender == "male") {
                                                            return "drugs";
                                                        } else if (gender == "female") {
                                                            return "Medical";
                                                        }
                                                    } else if (city != "Ashkelon") {
                                                        if (gender == null) {
                                                            return "Medical";
                                                        } else if (gender == "male") {
                                                            if (city == "jerusalem") {
                                                                return "Medical";
                                                            } else if (city != "jerusalem") {
                                                                return "Medical";
                                                            }
                                                        } else if (gender == "female") {
                                                            if (city == "jerusalem") {
                                                                return "Medical";
                                                            } else if (city != "jerusalem") {
                                                                return "Medical";
                                                            }
                                                        }
                                                    }
                                                } else if (optionvalue != "Emergency routine") {
                                                    if (gender == null) {
                                                        return "Medical";
                                                    } else if (gender == "male") {
                                                        if (city == "beerSheva") {
                                                            return "Medical";
                                                        } else if (city != "beerSheva") {
                                                            if (optionvalue == "Emergency") {
                                                                return "Medical";
                                                            } else if (optionvalue != "Emergency") {
                                                                if (city == "jerusalem") {
                                                                    return "Medical";
                                                                } else if (city != "jerusalem") {
                                                                    return "Medical";
                                                                }
                                                            }
                                                        }
                                                    } else if (gender == "female") {
                                                        if (city == "beerSheva") {
                                                            return "evacuation";
                                                        } else if (city != "beerSheva") {
                                                            if (city == "jerusalem") {
                                                                if (optionvalue == "Emergency") {
                                                                    return "Medical";
                                                                } else if (optionvalue != "Emergency") {
                                                                    return "Medical";
                                                                }
                                                            } else if (city != "jerusalem") {
                                                                return "Medical";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (language != "hebrew") {
                        if (age > 29) {
                            return "shelter";
                        } else if (age <= 29) {
                            if (gender == null) {
                                return "Medical";
                            } else if (gender == "male") {
                                if (optionvalue == null) {
                                    return "Medical";
                                } else if (optionvalue == "Emergency routine") {
                                    if (age > 18) {
                                        return "Medical";
                                    } else if (age <= 18) {
                                        return "Medical";
                                    }
                                } else if (optionvalue != "Emergency routine") {
                                    return "Medical";
                                }
                            } else if (gender == "female") {
                                if (optionvalue == null) {
                                    return "Medical";
                                } else if (optionvalue == "Emergency") {
                                    if (language == "russian") {
                                        return "information";
                                    } else if (language != "russian") {
                                        return "water";
                                    }
                                } else if (optionvalue != "Emergency") {
                                    return "Medical";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}